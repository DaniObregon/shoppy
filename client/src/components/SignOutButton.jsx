import React from "react";
import { Button } from "@chakra-ui/react";

export const SignOutButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      as={"a"}
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.600"}
      href={"#"}
      minWidth={"100px"}
      _hover={{
        bg: "gray.500",
      }}
    >
      Salir
    </Button>
  );
};
