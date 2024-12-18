import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { Auth } from "../../../client/src/components/main-page/Auth";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// Mockear módulos relacionados con Firebase
jest.mock("../../../client/src/config/firebaseConfig", () => ({
  auth: require("../../../__mocks__/firebaseConfig").auth,
}));

// Crear un mock del store de Redux
const mockStore = configureStore([]);
const initialState = {
  userInfo: { name: "", email: "", role_id: null },
};

const loggedState = {
  userInfo: { name: "giuseppe", email: "giuseppe@mail.com", role_id: 2 },
};

describe("Auth component", () => {
  let store;

  // beforeEach(() => {
  //   store = mockStore(initialState);
  // });

  // -----1 - Prueba de Renderización
  test("should render the SignOutButton when the user is logged in", () => {
    store = mockStore(loggedState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Auth />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );
    const SignOutButton = screen.getByRole("button", { name: /salir/i });
    expect(SignOutButton).toBeInTheDocument();
  });

  // 1 - Prueba de Renderización
  test("should render the SignUpButton when the user is not logged in", () => {
    store = mockStore(initialState);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Auth />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );
    const signUpButton = screen.getByRole("button", { name: /ingresar/i });
    expect(signUpButton).toBeInTheDocument();
  });

  // 2 - Prueba de Visibilidad en Diferentes Pantallas
  test("should be visible on mobile and larger screens", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Auth />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );
    const signUpButton = screen.getByRole("button", { name: /ingresar/i });

    // Simular tamaño de pantalla pequeña (móvil)
    global.innerWidth = 480;
    global.dispatchEvent(new Event("resize"));
    expect(signUpButton).toBeVisible();

    // Simular tamaño de pantalla grande (desktop)
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));
    expect(signUpButton).toBeVisible();
  });

  // 3 - Snapshot Testing
  test("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Auth />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
