import React, { useState } from "react";
import { Stack, useColorModeValue } from "@chakra-ui/react";
import { MobileNavItem } from "./MobileNavItem";
import { NAV_ITEMS } from "../data/navItems";

export const MobileNav = () => {
  const [openIndex, setOpenIndex] = useState(null); // Estado para controlar qué ítem está abierto

  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem, index) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          isOpen={openIndex === index} // Solo está abierto si el índice coincide
          onToggle={() => setOpenIndex(openIndex === index ? null : index)} // Cambia el estado de apertura
        />
      ))}
    </Stack>
  );
};
