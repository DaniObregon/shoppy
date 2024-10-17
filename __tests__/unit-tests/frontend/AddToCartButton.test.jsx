import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AddToCartButton } from "../../../client/src/components/AddToCartButton";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Configuración del mock del store de Redux
const mockStore = configureStore([]);

describe("AddToCartButton component", () => {
  let store;

  beforeEach(() => {
    // Inicializa el store con un estado inicial, ignorando el role_id en las pruebas.
    store = mockStore({
      userInfo: { role_id: 2 }, // El role_id es solo parte del estado, pero no lo probamos aquí.
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Limpia los mocks después de cada test
  });

  test("should render the button with the correct name", () => {
    render(
      <Provider store={store}>
        <AddToCartButton id="1" onClick={() => {}} />
      </Provider>
    );
    const button = screen.getByRole("button", { name: /add to cart/i });
    expect(button).toBeInTheDocument();
  });

  test("should add product to cart when user is admin", async () => {
    console.log = jest.fn(); // Mock de console.log para verificar la salida.

    render(
      <Provider store={store}>
        <AddToCartButton id="1" />
      </Provider>
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(button);

    // Verifica que el mensaje correcto se muestra en la consola.
    expect(console.log).toHaveBeenCalledWith(
      "Producto con id 1 agregado al carrito."
    );
  });

  test("should display error message when user is not admin", async () => {
    // Cambia el role_id a uno que no sea admin (e.g., role_id: 1).
    store = mockStore({
      userInfo: { role_id: 1 },
    });

    console.error = jest.fn(); // Mock de console.error para verificar la salida.

    render(
      <Provider store={store}>
        <AddToCartButton id="1" />
      </Provider>
    );

    const button = screen.getByRole("button", { name: /add to cart/i });
    await userEvent.click(button);

    // Verifica que el mensaje de error se muestra en la consola.
    expect(console.error).toHaveBeenCalledWith(
      "Acceso denegado: Solo los admin pueden agregar productos al carrito."
    );
  });
});
