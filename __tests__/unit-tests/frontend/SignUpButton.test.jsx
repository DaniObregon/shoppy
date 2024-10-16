import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SignUpButton } from "../../../client/src/components/SignUpButton";

describe("SignUpButton components", () => {
  test("should render the button with the correct name", () => {
    render(<SignUpButton onClick={() => {}} />);
    const button = screen.getByText(/ingresar/i);
    expect(button).toBeInTheDocument();
  });

  test("should call onClick function when clicked", () => {
    const handleClick = jest.fn(); // Crea una función simulada
    render(<SignUpButton onClick={handleClick} />);
    const button = screen.getByText(/ingresar/i);
    fireEvent.click(button); // Simula un clic en el botón
    expect(handleClick).toHaveBeenCalled(); // Verifica que la función fue llamada
  });
});
