import React, { useEffect, useState } from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";

export const Carousel = () => {
  const slides = [
    {
      img: "https://images.pexels.com/photos/6830805/pexels-photo-6830805.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      img: "https://images.pexels.com/photos/9863552/pexels-photo-9863552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      img: "https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      img: "https://images.pexels.com/photos/7990099/pexels-photo-7990099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
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

/** IMAGENES DE ZAPATILLAS
    {
      img: "https://hips.hearstapps.com/hmg-prod/images/run-reebok-running-shoes-64e3beadbe692.jpg",
    },
    {
      img: "https://scontent.faep9-1.fna.fbcdn.net/v/t39.30808-6/221863802_537077584388553_1054731658053590263_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEEh83xoHX7uA3M3jybX6IcPs2PM-LdG08-zY8z4t0bTz2WYdy-J1oOS1LypLBSULMMu1nfH3SXI_GrnhXAvLCO&_nc_ohc=ISWDfIVXRyQQ7kNvgGrT7st&_nc_ht=scontent.faep9-1.fna&oh=00_AYC_Go5c-pXVp8JD9ebJjKMzTQxAX-PF20lZ-vedSqFgcQ&oe=66E4BDD4",
    },
    {
      img: "https://brand.assets.adidas.com/capi/enUS/Images/1839569-seo-how-to-break-in-running-shoes-body-image-2_221-681798.jpg",
    },
    {
      img: "https://portcrossfit.com/wp-content/uploads/2023/08/run-nike-running-shoes-646cdd1a19c41-1200x600.jpg",
    },
 */