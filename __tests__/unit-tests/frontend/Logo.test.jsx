import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Logo } from "../../../client/src/components/Logo";
import { MemoryRouter, useNavigate } from "react-router-dom";

// Mock de useNavigate para simular redirección
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

// Mock de la imagen para evitar errores de importación
jest.mock("../../../client/src/assets/butterfly-02.png", () => "logo-mock.png");

describe("Logo component", () => {
  test("Should render Logo component with expected structure", () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <Logo />
        </MemoryRouter>
      </ChakraProvider>
    );

    // Verifica que la imagen del logo está en el documento
    const logo = screen.getByRole("img", { name: /logo/i });
    expect(logo).toBeInTheDocument();
  });

  test("Should navigate to '/logo-navigation' when clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <ChakraProvider>
        <MemoryRouter>
          <Logo />
        </MemoryRouter>
      </ChakraProvider>
    );

    const logo = screen.getByRole("img", { name: /logo/i });
    fireEvent.click(logo);

    // Verifica que navigate fue llamado con el path correcto
    expect(mockNavigate).toHaveBeenCalledWith("/logo-navigation");
  });

  test("should match snapshot", () => {
    const { asFragment } = render(
      <ChakraProvider>
        <MemoryRouter>
          <Logo />
        </MemoryRouter>
      </ChakraProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
