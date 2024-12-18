import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DesktopNav } from "../../../client/src/components/main-page/DesktopNav";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);

describe("DesktopNav component", () => {
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

  test("should render the desktop nav bar with at least one link", () => {
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    const navLinks = screen.getAllByRole("link");
    expect(navLinks.length).toBeGreaterThan(0);
  });

  test("should not display 'Admin Panel' for roles less than or equal to 1", () => {
    // Probar con rol 1
    store = mockStore(userRole1State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(
      screen.queryByRole("link", { name: /admin panel/i })
    ).not.toBeInTheDocument(); // Rol 1 no tiene acceso

    // Probar con rol 0 (no autenticado o rol menor)
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(
      screen.queryByRole("link", { name: /admin panel/i })
    ).not.toBeInTheDocument(); // No debería estar presente
  });

  test("should display 'Admin Panel' for roles greater than 1", () => {
    // Probar con rol 2
    store = mockStore(userRole2State);
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    expect(
      screen.getByRole("link", { name: /admin panel/i })
    ).toBeInTheDocument(); // Rol 2 tiene acceso
  });

  test("should match snapshot", () => {
    store = mockStore(userRole1State); // Simular rol 1
    const { asFragment } = render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  // ----- 5 - Prueba de Navegación -----
  test("should navigate to the correct path when a link is clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate); // Mock de la función navigate

    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <DesktopNav />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    // Obtener cualquier enlace disponible (ya que no importa cuál en particular)
    const link = screen.getAllByRole("link")[0]; // Obtener el primer enlace para la prueba
    fireEvent.click(link); // Simular clic en el enlace

    // Verificar que mockNavigate haya sido llamado con algún path (puedes ajustarlo si necesitas mayor especificidad)
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(expect.any(String)); // Acepta cualquier string como argumento de la función
  });
});
