import React, { useState } from "react";
import { Stack, useColorModeValue } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MobileNavItem } from "./MobileNavItem";
import { NAV_ITEMS } from "../../utils/navItems";

export const MobileNav = () => {
  const [openIndex, setOpenIndex] = useState(null); // Estado para controlar qué ítem está abierto

  // Obtener el rol del usuario desde Redux
  const { role_id } = useSelector((state) => state.userInfo);

  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS(role_id).map((navItem, index) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          isOpen={openIndex === index} // Solo está abierto si el índice coincide
          onToggle={() => setOpenIndex(openIndex === index ? null : index)} // Cambia el estado de apertura
          onClick={() => handleNavigation(navItem.path)}
        />
      ))}
    </Stack>
  );
};
