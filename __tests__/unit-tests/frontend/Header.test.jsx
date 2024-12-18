import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Header } from "../../../client/src/components/main-page/Header";

describe("Header component", () => {
  test("Should render Header component with expected structure", () => {
    render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );

    // Verifica que el contenedor principal del Header está presente
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    // Verifica que el header contiene tres elementos de texto
    const textElements = screen.getAllByText(/./); // Selector genérico para cualquier texto
    expect(textElements.length).toBe(3);
  });

  test("should match snapshot", () => {
    const { asFragment } = render(
      <ChakraProvider>
        <Header />
      </ChakraProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
