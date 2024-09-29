import React from "react";
import { chakra, Box, Flex } from "@chakra-ui/react";

export const Card = ({ brand, model, description, price, imgUrl }) => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      w="full"
      mx="auto"
      mb={4}
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
          <chakra.button
            bg="gray.800"
            fontSize="xs"
            fontWeight="bold"
            color="white"
            px={2}
            py={1}
            rounded="lg"
            textTransform="uppercase"
            _hover={{
              bg: "gray.700",
              _dark: { bg: "gray.600" },
            }}
            _focus={{
              bg: "gray.700",
              _dark: { bg: "gray.600" },
              outline: "none",
            }}
          >
            Add to cart
          </chakra.button>
        </Flex>
      </Box>
    </Flex>
  );
};
