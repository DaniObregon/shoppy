import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MobileNav } from "../../../client/src/components/MobileNav";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { NAV_ITEMS } from "../../../client/src/utils/navItems";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);

describe("MobileNav component", () => {
  let store;

  const initialState = {
    userInfo: { role_id: null },
  };

  const userRole1State = {
    userInfo: { role_id: 1 },
  };

  const userRole2State = {
    userInfo: { role_id: 2 },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the mobile nav bar with correct items based on role", () => {
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <MobileNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    const expectedNavItems = NAV_ITEMS(userRole1State.userInfo.role_id).map(
      (item) => item.label
    );

    expectedNavItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test("should navigate to the correct path when an item is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    store = mockStore(userRole1State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <MobileNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    // Obtener los elementos de navegación
    const navItems = NAV_ITEMS(userRole1State.userInfo.role_id);

    // Simular clic en cada elemento de navegación
    navItems.forEach((navItem) => {
      const itemElement = screen.getByText(navItem.label); // Obtener el elemento por su texto
      fireEvent.click(itemElement); // Simular clic en el elemento
      expect(mockNavigate).toHaveBeenCalledWith(navItem.path); // Verificar que se navega al path correcto
    });
  });

  test("should not display 'Admin Panel' for roles less than or equal to 1", () => {
    store = mockStore(userRole1State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <MobileNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(screen.queryByText(/Admin Panel/i)).not.toBeInTheDocument();

    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <MobileNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(screen.queryByText(/Admin Panel/i)).not.toBeInTheDocument();
  });

  test("should display 'Admin Panel' for roles greater than 1", () => {
    store = mockStore(userRole2State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <MobileNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(screen.getByText(/Admin Panel/i)).toBeInTheDocument();
  });

  test("should match snapshot", () => {
    store = mockStore(userRole1State);
    const { asFragment } = render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <MobileNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
