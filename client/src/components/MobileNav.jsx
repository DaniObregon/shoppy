import React from "react";
import { Stack, useColorModeValue } from "@chakra-ui/react";
import { MobileNavItem } from "./MobileNavItem";

export const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
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
