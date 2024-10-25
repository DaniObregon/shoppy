import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { slides } from "../data/carouselSlides";

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // Estado para manejar si la transición está pausada
  const [isHovered, setIsHovered] = useState(false); // Estado para manejar si el mouse está sobre el carrusel

  const slidesCount = slides.length;

  const carouselStyle = {
    transition: "all 1.1s",
    ml: `-${currentSlide * 100}%`,
  };

  const SLIDES_INTERVAL_TIME = 3000;
  const ANIMATION_DIRECTION = "right";

  useEffect(() => {
    const prevSlide = () => {
      setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
    };

    const nextSlide = () => {
      setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
    };

    const automatedSlide = setInterval(() => {
      if (!isPaused) {
        ANIMATION_DIRECTION.toLowerCase() === "left"
          ? prevSlide()
          : nextSlide();
      }
    }, SLIDES_INTERVAL_TIME);

    return () => clearInterval(automatedSlide);
  }, [slidesCount, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    setIsHovered(true); // Actualiza el estado isHovered
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsHovered(false); // Actualiza el estado isHovered
  };

  return (
    <Flex
      id="carousel" // Agregar un ID para identificarlo en los tests
      role="region"
      aria-label="carousel"
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={0}
      alignItems="center"
      justifyContent="center"
      onMouseEnter={handleMouseEnter} // Pausar al hacer hover
      onMouseLeave={handleMouseLeave} // Reanudar al salir del hover
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="500px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box
              key={`slide-${sid}`}
              flex="none"
              boxSize="full"
              shadow="md"
              transition="transform 0.3s ease"
              style={{
                transform: isHovered ? "translateY(-5px)" : "translateY(0px)",
              }}
            >
              <Text
                color="white"
                fontSize="xs"
                p="8px 12px"
                pos="absolute"
                top="0"
                whiteSpace="nowrap"
              >
                {sid + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.img}
                alt="carousel image"
                boxSize="full"
                objectFit="cover"
                style={{
                  opacity: isHovered ? "0.8" : "1",
                  transition: "opacity 0.3s ease",
                }}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
