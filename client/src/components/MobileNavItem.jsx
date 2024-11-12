import React from "react";
import {
  Stack,
  Link,
  Icon,
  useColorModeValue,
  Flex,
  Collapse,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const MobileNavItem = ({ label, children, onClick, isOpen, onToggle }) => {
  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        as={"div"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
      >
        {/* Usamos Link en lugar de Text, manteniendo el estilo */}
        <Link
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
          onClick={onClick}
          cursor="pointer"
          _hover={{
            textDecoration: "none",
          }}
        >
          {label}
        </Link>
        
        {/* El icono flecha maneja la apertura/cierre del submenú */}
        {children && (
          <Icon
            as={ChevronDownIcon}
            role="img"
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            aria-expanded={isOpen ? "true" : "false"}
            onClick={(e) => {
              e.stopPropagation(); // Evita la propagación del evento para no activar la navegación
              onToggle();
            }}
            cursor="pointer"
          />
        )}
      </Flex>

      {/* Colapso del submenú */}
      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {Array.isArray(children) &&
            children.map((child) => (
              child.path ? (
                <Link
                  key={child.label}
                  py={2}
                  href={child.path}
                  cursor="pointer"
                >
                  {child.label}
                </Link>
              ) : (
                <Link
                  key={child.label}
                  py={2}
                  cursor="default"
                  _hover={{
                    textDecoration: "none",
                  }}
                >
                  {child.label}
                </Link>
              )
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
