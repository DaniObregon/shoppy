import React from "react";
import { chakra } from "@chakra-ui/react";
import { useSelector } from "react-redux";

export const AddToCartButton = ({ id }) => {
  // Obtener el role_id desde el estado de Redux
  const role_id = useSelector((state) => state.userInfo.role_id);

  // Evita la propagación del clic hacia el contenedor de la tarjeta
  const handleAddToCart = (event) => {
    event.stopPropagation();

    // Lógica para agregar el producto al carrito
    if (role_id === 2) {
      // Usuario con rol 'admin'
      console.log(`Producto con id ${id} agregado al carrito.`);
    } else {
      // Si no es un admin
      console.error(
        "Acceso denegado: Solo los admin pueden agregar productos al carrito."
      );
    }
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
