import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../../../client/src/components/main-page/Navbar";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";

// Mockear módulos relacionados con Firebase
jest.mock("../../../client/src/config/firebaseConfig", () => ({
  auth: require("../../../__mocks__/firebaseConfig").auth,
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../../client/src/assets/butterflyLogo.png", () => "");

jest.mock("../../../client/src/components/main-page/MobileNav", () => {
  return {
    MobileNav: () => <div data-testid="mobile-nav">Mobile Nav</div>,
  };
});

const mockStore = configureStore([]);

describe("Navbar component", () => {
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

  test("renders Navbar with Logo, Auth, and DarkModeToggle components", () => {
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <Navbar />
          </Router>
        </ChakraProvider>
      </Provider>
    );

    // Verificar si Auth está presente (ej. botón de iniciar sesión o cerrar sesión)
    expect(screen.getByText(/ingresar/i)).toBeInTheDocument();

    // Verificar si los componentes clave están presentes
    expect(
      screen.getByRole("button", { name: /toggle navigation/i })
    ).toBeInTheDocument();

    // Verificar si DarkModeToggle está presente
    expect(
      screen.getByRole("button", { name: /toggle dark mode/i })
    ).toBeInTheDocument();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ChakraProvider>
          <Router>
            <Navbar />
          </Router>
        </ChakraProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
