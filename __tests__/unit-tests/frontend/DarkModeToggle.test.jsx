import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { DarkModeToggle } from "../../../client/src/components/main-page/DarkModeToggle";
import { ChakraProvider } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/react";

// Mockear el hook useColorMode
jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useColorMode: jest.fn(),
}));

describe("DarkModeToggle component", () => {
  beforeEach(() => {
    useColorMode.mockClear();
  });

  test("should render the button with the correct name", () => {
    useColorMode.mockReturnValue({
      colorMode: "light",
      toggleColorMode: jest.fn(),
    });

    render(
      <ChakraProvider>
        <DarkModeToggle />
      </ChakraProvider>
    );

    // Busca el botón usando el atributo `data-testid` que ya tienes configurado en el componente.
    const button = screen.getByTestId("dark-mode-toggle");

    // Verifica que el botón esté en el documento.
    expect(button).toBeInTheDocument();
  });

  test("should toggle icon on click", () => {
    const toggleColorModeMock = jest.fn();

    // Simular el modo oscuro
    useColorMode.mockReturnValue({
      colorMode: "dark",
      toggleColorMode: toggleColorModeMock,
    });

    render(
      <ChakraProvider>
        <DarkModeToggle />
      </ChakraProvider>
    );

    const button = screen.getByTestId("dark-mode-toggle");
    fireEvent.click(button); // Simula un clic en el botón
    expect(toggleColorModeMock).toHaveBeenCalled(); // Verifica que la función fue llamada
  });

  test("should be visible on mobile screens and visible on larger screens", () => {
    useColorMode.mockReturnValue({
      colorMode: "light",
      toggleColorMode: jest.fn(),
    });

    render(
      <ChakraProvider>
        <DarkModeToggle />
      </ChakraProvider>
    );

    const button = screen.getByTestId("dark-mode-toggle");

    // Simular tamaño de pantalla pequeña (móvil)
    global.innerWidth = 480;
    global.dispatchEvent(new Event("resize")); // Dispara el evento de resize
    expect(button).toBeVisible(); // Espera que el botón sea visible

    // Simular tamaño de pantalla grande (desktop)
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));
    expect(button).toBeVisible(); // Espera que el botón sea visible
  });

  test("should match snapshot", () => {
    useColorMode.mockReturnValue({
      colorMode: "light",
      toggleColorMode: jest.fn(),
    });

    const { asFragment } = render(
      <ChakraProvider>
        <DarkModeToggle />
      </ChakraProvider>
    );
    expect(asFragment()).toMatchSnapshot(); // Toma un snapshot del componente
  });
});
