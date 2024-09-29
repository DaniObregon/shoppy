import React from "react";
import { chakra } from "@chakra-ui/react";

export const AddToCartButton = ({ id, onClick }) => {
  const handleAddToCart = (event) => {
    event.stopPropagation(); // Evita la propagación del clic hacia el contenedor de la tarjeta
    // Lógica para agregar el producto al carrito
    console.log(`Producto con id ${id} agregado al carrito.`);
  };

  return (
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
      onClick={handleAddToCart} // Evento de clic del botón para agregar al carrito
    >
      Add to cart
    </chakra.button>
  );
};
