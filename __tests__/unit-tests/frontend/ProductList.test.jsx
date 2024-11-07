import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import configureStore from "redux-mock-store";
import axios from "axios";
import { ProductList } from "../../../client/src/components/ProductList";
import ResizeObserver from "resize-observer-polyfill";

// ----- Mock de axios para simular las llamadas a la API -----
jest.mock("axios");

const mockStore = configureStore([]);
const store = mockStore({});

describe("ProductList component", () => {
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

  const mockProducts = [
    {
      id: "1",
      brand: "Brand A",
      model: "Model X",
      description: "Description for Product 1",
      price: "49.99",
      imgUrl: "https://example.com/product1.jpg",
    },
    {
      id: "2",
      brand: "Brand B",
      model: "Model Y",
      description: "Description for Product 2",
      price: "79.99",
      imgUrl: "https://example.com/product2.jpg",
    },
  ];

  beforeAll(() => {
    // Mockear ResizeObserver para simular cambios de tamaño en el layout
    global.ResizeObserver = ResizeObserver;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // ----- 1 - Prueba de Renderización con Productos Mock -----
  test("should render products received from API", async () => {
    axios.get.mockResolvedValue({ data: mockProducts });
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <ProductList />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      // Verifica que cada producto mock esté en el documento
      mockProducts.forEach((product) => {
        expect(screen.getByText(product.brand)).toBeInTheDocument();
        expect(screen.getByText(product.model)).toBeInTheDocument();
        expect(screen.getByText(`$${product.price}`)).toBeInTheDocument();
      });
    });
  });

  // ----- 2 - Prueba de Manejo de Error en la Llamada a la API -----
  test("should handle API error gracefully", async () => {
    axios.get.mockRejectedValue(new Error("API Error"));
    store = mockStore(userRole1State); // Simular rol 1
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <ProductList />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      // Aquí podrías verificar un mensaje de error, o simplemente asegurarte de que no se renderizan productos
      expect(screen.queryByText("Brand A")).not.toBeInTheDocument();
      expect(screen.queryByText("Brand B")).not.toBeInTheDocument();
    });
  });

  // ----- 3 - Snapshot Testing -----
  test("should match snapshot", async () => {
    axios.get.mockResolvedValue({ data: mockProducts });

    const { asFragment } = render(
      <Provider store={store}>
        <BrowserRouter>
          <ChakraProvider>
            <ProductList />
          </ChakraProvider>
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(asFragment()).toMatchSnapshot();
    });
  });
});
