import React from "react";
import { Button } from "@chakra-ui/react";

export const SignOutButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      display={{ base: "inline-flex", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.600"}
      minWidth={"100px"}
      _hover={{
        bg: "gray.500",
      }}
    >
      Salir
    </Button>
  );
};
