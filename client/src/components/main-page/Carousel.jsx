import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { slides } from "../../data/carouselSlides";

export const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleSlides, setVisibleSlides] = useState(slides);
  const [isPaused, setIsPaused] = useState(false); // Estado para manejar si la transición está pausada
  const [isHovered, setIsHovered] = useState(false); // Estado para manejar si el mouse está sobre el carrusel

  const slidesCount = visibleSlides.length;
  const carouselStyle = {
    transition: "all 1.5s",
    ml: `-${currentSlide * 100}%`,
  };

  const SLIDES_INTERVAL_TIME = 4000;
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
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setIsHovered(false);
  };

  // Función para manejar el error de carga de imágenes y eliminar el slide
  const handleImageError = (index) => {
    setVisibleSlides((prevSlides) =>
      prevSlides.filter((_, slideIndex) => slideIndex !== index)
    );
  };

  return (
    <Flex
      id="carousel"
      role="region"
      aria-label="carousel"
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={0}
      alignItems="center"
      justifyContent="center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="500px" w="full" {...carouselStyle}>
          {visibleSlides.map((slide, index) => (
            <Box
              key={`slide-${index}`}
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
                {index + 1} / {slidesCount}
              </Text>
              <Image
                src={slide.img}
                alt={`Slide ${index + 1}`}
                boxSize="full"
                objectFit="cover"
                style={{
                  opacity: isHovered ? "0.8" : "1",
                  transition: "opacity 0.3s ease",
                }}
                onError={() => handleImageError(index)} // Maneja el error de carga de imagen eliminando el slide
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
