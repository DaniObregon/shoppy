import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Card } from "../../../client/src/components/Card";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { useNavigate } from "react-router-dom";

// ----- Mock de navigate para simular redirección -----
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const mockStore = configureStore([]);
const store = mockStore({
  userInfo: { role_id: 1 }, // Ajusta esto según lo que necesite tu componente
});

describe("Card component", () => {
  const mockNavigate = require("react-router-dom").useNavigate;
  const cardProps = {
    id: "1",
    brand: "BrandName",
    model: "ModelName",
    description: "This is a description.",
    price: "99.99",
    imgUrl: "https://example.com/image.jpg",
  };

  // ----- 1 - Prueba de Renderización -----
  test("should render card with brand, model, description, and price", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Card {...cardProps} />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/BrandName/i)).toBeInTheDocument();
    expect(screen.getByText(/ModelName/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a description./i)).toBeInTheDocument();
    expect(screen.getByText(/\$99.99/i)).toBeInTheDocument();
  });

  //   ----- 2 - Prueba de Interacción: Redirección al hacer clic -----
  test("should navigate to product details when clicked", () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Card {...cardProps} />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    const card = screen.getByText(/BrandName/i).closest("div"); // Selecciona la card mediante el nombre de la marca
    fireEvent.click(card);

    expect(mockNavigate).toHaveBeenCalledWith("/product/1"); // Verifica que la redirección ocurrió con la URL esperada
  });

  // ----- 3 - Prueba de Visibilidad en Diferentes Pantallas -----
  test("should be visible on mobile and larger screens", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Card {...cardProps} />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    const card = screen.getByText(/BrandName/i).closest("div");

    // Simular tamaño de pantalla pequeña (móvil)
    global.innerWidth = 480;
    global.dispatchEvent(new Event("resize"));
    expect(card).toBeVisible();

    // Simular tamaño de pantalla grande (desktop)
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));
    expect(card).toBeVisible();
  });

  // ----- 4 - Snapshot Testing -----
  test("should match snapshot", () => {
    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Card {...cardProps} />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot(); // Toma un snapshot del componente
  });

  // ----- 5 - Prueba de Renderización de la Imagen -----
  test("should display the correct background image", () => {
    // Desestructuramos 'container' de la llamada a 'render'
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <Card {...cardProps} />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    // Busca el Box que debe tener el estilo de backgroundImage
    const imageBox = container.querySelector('div[style*="background-image"]');

    // Verifica que el estilo de backgroundImage es el correcto
    expect(imageBox).toHaveStyle(`background-image: url(${cardProps.imgUrl})`);
  });
});
