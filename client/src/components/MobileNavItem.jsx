import React from "react";
import {
  Stack,
  Link,
  Text,
  Icon,
  useColorModeValue,
  Flex,
  Collapse,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const MobileNavItem = ({ label, children, onClick, isOpen, onToggle }) => {
  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={"div"}
        justify={"space-between"}
        align={"center"}
        _hover={{
          textDecoration: "none",
        }}
        onClick={onClick}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
            aria-expanded={isOpen ? "true" : "false"}
          />
        )}
      </Flex>

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
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
