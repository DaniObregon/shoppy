import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignOutButton } from "../../../client/src/components/SignOutButton";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("SignOutButton component", () => {
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
  // Prueba de Renderización
  test("should render the button with the correct name", () => {
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <ChakraProvider>
          <SignOutButton onClick={() => {}} />
        </ChakraProvider>
      </Provider>
    );

    const button = screen.getByRole("button", { name: /salir/i });
    expect(button).toBeInTheDocument();
  });

  //   Prueba de Interacción
  test("should call onClick function when clicked", () => {
    store = mockStore(userRole1State); // Simular rol 1
    const handleClick = jest.fn();
    render(
      <Provider store={store}>
        <ChakraProvider>
          <SignOutButton onClick={handleClick} />
        </ChakraProvider>
      </Provider>
    );

    const button = screen.getByText(/salir/i);
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });

  // Prueba de Visibilidad en Diferentes Pantallas
  test("should be visible on mobile screens and visible on larger screens", () => {
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <ChakraProvider>
          <SignOutButton onClick={() => {}} />
        </ChakraProvider>
      </Provider>
    );

    const button = screen.getByRole("button", { name: /salir/i });

    // Simular tamaño de pantalla pequeña (móvil)
    global.innerWidth = 480;
    global.dispatchEvent(new Event("resize"));
    expect(button).toBeVisible();

    // Simular tamaño de pantalla grande (desktop)
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));
    expect(button).toBeVisible();
  });

  // Snapshot Testing
  test("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <ChakraProvider>
          <SignOutButton onClick={() => {}} />
        </ChakraProvider>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
