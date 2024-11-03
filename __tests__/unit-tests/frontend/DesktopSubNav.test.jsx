import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DesktopSubNav } from "../../../client/src/components/DesktopSubNav";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureStore([]);

describe("DesktopSubNav component", () => {
  let store;

  // Estado inicial (usuario no autenticado)
  const initialState = {
    userInfo: { role_id: null },
  };

  // Estado cuando el usuario tiene rol 1
  const userRole1State = {
    userInfo: { role_id: 1 },
  };

  // Estado cuando el usuario tiene rol 2
  const userRole2State = {
    userInfo: { role_id: 2 },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the desktop sub nav bar with at least one link", () => {
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopSubNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test("should navigate to the correct path when a link is clicked", () => {
    const mockOnClick = jest.fn();
    render(
      <ChakraProvider>
        <Router>
          <DesktopSubNav label="Sample Label" onClick={mockOnClick} />
        </Router>
      </ChakraProvider>
    );

    const link = screen.getByRole("group");
    fireEvent.click(link);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(
      <ChakraProvider>
        <Router>
          <DesktopSubNav />
        </Router>
      </ChakraProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
