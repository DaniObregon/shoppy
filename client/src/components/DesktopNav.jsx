import React from "react";
import {
  Box,
  Stack,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
} from "@chakra-ui/react";
import { DesktopSubNav } from "./DesktopSubNav";
import { NAV_ITEMS } from "../data/navItems";

export const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"m"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

// const NAV_ITEMS = [
//     {
//       label: "Capilares",
//       href: "#capilares",
//       children: [
//         {
//           label: "Coloración",
//           href: "#coloracion",
//         },
//         {
//           label: "Styling",
//           href: "#styling",
//         },
//         {
//           label: "HairCare",
//           href: "#haircare",
//         },
//         {
//           label: "Forma",
//           href: "#forma",
//         },
//       ],
//     },
//     {
//       label: "Manos y Uñas",
//       href: "#manos-y-unas",
//       children: [
//         {
//           label: "Prueba children",
//           href: "#coloracion",
//         },
//       ],
//     },
//     {
//       label: "Maquillaje",
//       href: "#maquillaje",
//     },
//     {
//       label: "Accesorios",
//       href: "#accesorios",
//     },
//     {
//       label: "Equipamientos",
//       href: "#equipamientos",
//     },
//     {
//       label: "Estética y Spa",
//       href: "#estetica-y-spa",
//     },
//   ];