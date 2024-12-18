import "@testing-library/jest-dom";
import React from "react";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { Carousel } from "../../../client/src/components/main-page/Carousel";
import { ChakraProvider } from "@chakra-ui/react";
import { slides } from "../../../client/src/data/carouselSlides"; // Importamos los slides directamente

describe("Carousel component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("should render the carousel with the correct number of slides", () => {
    render(
      <ChakraProvider>
        <Carousel />
      </ChakraProvider>
    );

    const slidesCount = slides.length;
    const images = screen.getAllByAltText(/Slide \d+/i);

    // Verificar que se renderizan todas las imágenes de los slides
    expect(images).toHaveLength(slidesCount);

    // Verificar que la numeración se muestra correctamente (ej. "1 / 4" para el primer slide)
    expect(screen.getByText(`1 / ${slidesCount}`)).toBeInTheDocument();
  });

  test("should automatically transition to the next slide after the specified interval", () => {
    render(
      <ChakraProvider>
        <Carousel />
      </ChakraProvider>
    );

    const slidesCount = slides.length;
    const intervalTime = 3000; // Tiempo de intervalo

    // Verificar que el primer slide se muestra inicialmente
    expect(screen.getByText(`1 / ${slidesCount}`)).toBeInTheDocument();

    // Avanzar el tiempo dentro de un bloque act para forzar el ciclo de renderizado
    act(() => {
      jest.advanceTimersByTime(intervalTime);
    });
    expect(screen.getByText(`2 / ${slidesCount}`)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(intervalTime);
    });
    expect(screen.getByText(`3 / ${slidesCount}`)).toBeInTheDocument();

    // Avanzar tiempo hasta que vuelva al primer slide (suponiendo que es cíclico)
    act(() => {
      for (let i = 3; i <= slidesCount; i++) {
        jest.advanceTimersByTime(intervalTime);
      }
    });
    expect(screen.getByText(`1 / ${slidesCount}`)).toBeInTheDocument();
  });

  test("should match snapshot", () => {
    const { asFragment } = render(
      <ChakraProvider>
        <Carousel />
      </ChakraProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test("should pause the auto-transition when the user hovers over the carousel", () => {
    render(
      <ChakraProvider>
        <Carousel />
      </ChakraProvider>
    );

    const intervalTime = 3000;
    const carousel = screen.getByRole("region", { name: /carousel/i });

    // Simular el evento de hover
    fireEvent.mouseEnter(carousel);

    // Avanzar el tiempo pero asegurar que el slide no cambie debido al hover
    jest.advanceTimersByTime(intervalTime);
    expect(screen.getByText(`1 / ${slides.length}`)).toBeInTheDocument();
  });

  test("should resume the auto-transition when the user stops hovering over the carousel", () => {
    jest.useFakeTimers(); // Usa temporizadores simulados
    render(
      <ChakraProvider>
        <Carousel />
      </ChakraProvider>
    );

    const intervalTime = 3000; // Tiempo de intervalo
    const carousel = screen.getByRole("region", { name: /carousel/i });

    // Simular el evento de hover para pausar
    fireEvent.mouseEnter(carousel);

    // Simular la salida del hover para reanudar
    fireEvent.mouseLeave(carousel);

    // Avanzar el temporizador y verificar que el slide cambia
    jest.advanceTimersByTime(intervalTime);
    expect(screen.getByText(`2 / ${slides.length}`)).toBeInTheDocument(); // Verifica que el siguiente slide esté visible
  });

  test("should remove a slide when its image fails to load", () => {
    render(
      <ChakraProvider>
        <Carousel />
      </ChakraProvider>
    );

    const initialSlidesCount = slides.length;
    const imageWithError = screen.getAllByRole("img")[1]; // Simula el error en la segunda imagen

    // Disparar el evento de error en la carga de la imagen
    fireEvent.error(imageWithError);

    // Verificar que el número de slides visibles se haya reducido en 1
    expect(screen.getAllByRole("img")).toHaveLength(initialSlidesCount - 1);

    // Verificar que la numeración se actualizó correctamente
    expect(
      screen.getByText(`1 / ${initialSlidesCount - 1}`)
    ).toBeInTheDocument();
  });
});
