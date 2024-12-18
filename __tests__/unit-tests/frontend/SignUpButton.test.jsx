import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { SignUpButton } from "../../../client/src/components/main-page/SignUpButton";

/**
 * Renderización: Se verifica que el botón se renderice correctamente y que contenga el texto esperado.
 * Interacción: Se verifica que se llama a la función onClick cuando se hace clic en el botón.
 * Visibilidad en Diferentes Pantallas: Garantizar que el botón sea visible en diferentes tamaños de pantalla.
 * Snapshot Testing: Asegura la deteccion cambios inesperados en el componente a medida que el proyecto evoluciona.
 */

describe("SignUpButton component", () => {
  test("should render the button with the correct name", () => {
    render(<SignUpButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /ingresar/i });
    expect(button).toBeInTheDocument();
  });

  test("should call onClick function when clicked", () => {
    const handleClick = jest.fn(); // Crea una función simulada
    render(<SignUpButton onClick={handleClick} />);
    const button = screen.getByText(/ingresar/i);
    fireEvent.click(button); // Simula un clic en el botón
    expect(handleClick).toHaveBeenCalled(); // Verifica que la función fue llamada
  });

  test("should be visible on mobile screens and visible on larger screens", () => {
    render(<SignUpButton onClick={() => {}} />);
    const button = screen.getByRole("button", { name: /ingresar/i });

    // Simular tamaño de pantalla pequeña (móvil)
    global.innerWidth = 480;
    global.dispatchEvent(new Event("resize"));
    expect(button).toBeVisible(); // Espera que el botón sea visible

    // Simular tamaño de pantalla grande (desktop)
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));
    expect(button).toBeVisible(); // Espera que el botón sea visible
  });

  test("should match snapshot", () => {
    const { asFragment } = render(<SignUpButton onClick={() => {}} />);
    expect(asFragment()).toMatchSnapshot(); // Toma un snapshot del componente
  });
});
