import React from "react";
import { useNavigate } from "react-router-dom";
import { chakra, Box, Flex } from "@chakra-ui/react";
import { AddToCartButton } from "./AddToCartButton";

export const Card = ({ id, brand, model, description, price, imgUrl }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/product/${id}`);
  };

  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="full"
      mx="auto"
      mb={4}
      transition="transform 0.15s ease-in-out"
      _hover={{
        transform: "scale(1.015)",
        cursor: "pointer",
      }}
      onClick={handleNavigate} // Redirige cuando se hace clic en la card
    >
      <Box
        bg="gray.300"
        h={{ base: 56, md: 64 }} //Imagen más grande para mantener la proporción
        w="full"
        rounded="lg"
        shadow="md"
        bgSize="cover"
        bgPos="center"
        style={{
          backgroundImage: `url(${imgUrl})`,
        }}
      ></Box>

      <Box
        w={{ base: "80%", md: "70%" }} // Caja de datos pequeña y centrada
        bg="white"
        _dark={{ bg: "gray.800" }}
        mt={-10} // Superpone la caja de datos en la imagen
        shadow="lg"
        rounded="lg"
        overflow="hidden"
      >
        <chakra.h3
          py={2}
          textAlign="center"
          fontWeight="bold"
          textTransform="uppercase"
          color="gray.800"
          _dark={{ color: "white" }}
          letterSpacing={1}
        >
          {brand}
        </chakra.h3>
        <chakra.p
          py={1}
          textAlign="center"
          fontWeight="medium"
          color="gray.600"
          _dark={{ color: "gray.300" }}
          fontSize="sm"
        >
          {model}
        </chakra.p>
        <chakra.p
          py={1}
          textAlign="center"
          fontWeight="medium"
          color="gray.600"
          _dark={{ color: "gray.300" }}
          fontSize="sm"
          sx={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: "3",
            WebkitBoxOrient: "vertical",
            wordBreak: "break-word", // Corta palabras largas automáticamente
            overflowWrap: "break-word", // Compatibilidad adicional
          }}
        >
          {description}
        </chakra.p>
        <Flex
          alignItems="center"
          justifyContent="space-between"
          py={2}
          px={3}
          bg="gray.200"
          _dark={{ bg: "gray.700" }}
        >
          <chakra.span
            fontWeight="bold"
            color="gray.800"
            _dark={{ color: "gray.200" }}
          >
            ${price}
          </chakra.span>
          <AddToCartButton id={id} />
        </Flex>
      </Box>
    </Flex>
  );
};
