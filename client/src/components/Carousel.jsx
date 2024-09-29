import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export const Carousel = () => {
  const slides = [
    {
      img: "https://www.brooksrunning.com/on/demandware.static/-/Library-Sites-BrooksRunningShared/default/dw26f51a29/cms-content/Project/ADT/Brooks-Running/EMEA/Blog/2023/April/best-running-shoes-for-knee-pain/S23_RHB_knee_Hero_XL.jpg",
    },
    {
      img: "https://hips.hearstapps.com/hmg-prod/images/run-reebok-running-shoes-64e3beadbe692.jpg",
    },
    {
      img: "https://brand.assets.adidas.com/capi/enUS/Images/1839569-seo-how-to-break-in-running-shoes-body-image-2_221-681798.jpg",
    },
    {
      img: "https://portcrossfit.com/wp-content/uploads/2023/08/run-nike-running-shoes-646cdd1a19c41-1200x600.jpg",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

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
      ANIMATION_DIRECTION.toLowerCase() === "left" ? prevSlide() : nextSlide();
    }, SLIDES_INTERVAL_TIME);
    return () => clearInterval(automatedSlide);
  }, [slidesCount]);

  return (
    <Flex
      w="full"
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={10}
      alignItems="center"
      justifyContent="center"
    >
      <Flex w="full" overflow="hidden">
        <Flex pos="relative" h="500px" w="full" {...carouselStyle}>
          {slides.map((slide, sid) => (
            <Box key={`slide-${sid}`} flex="none" boxSize="full" shadow="md">
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
                objectFit="cover" // Ajusta la imagen para cubrir el contenedor manteniendo su relación de aspecto
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </Flex>
  );
};
