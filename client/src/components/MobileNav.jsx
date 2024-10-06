import React, { useState } from "react";
import { Stack, useColorModeValue } from "@chakra-ui/react";
import { MobileNavItem } from "./MobileNavItem";

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

const NAV_ITEMS = [
  {
    label: "Capilares",
    href: "#capilares",
    children: [
      {
        label: "Coloración",
        href: "#coloracion",
      },
      {
        label: "Styling",
        href: "#styling",
      },
      {
        label: "HairCare",
        href: "#haircare",
      },
      {
        label: "Forma",
        href: "#forma",
      },
    ],
  },
  {
    label: "Manos y Uñas",
    href: "#manos-y-unas",
    children: [
      {
        label: "Prueba children",
        href: "#coloracion",
      },
    ],
  },
  {
    label: "Maquillaje",
    href: "#maquillaje",
  },
  {
    label: "Accesorios",
    href: "#accesorios",
  },
  {
    label: "Equipamientos",
    href: "#equipamientos",
  },
  {
    label: "Estética y Spa",
    href: "#estetica-y-spa",
  },
];
