import React from "react";
import { Button } from "@chakra-ui/react";

export const SignUpButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      as={"a"}
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.400"}
      minWidth={"100px"}
      _hover={{
        bg: "pink.300",
      }}
    >
      Ingresar
    </Button>
  );
};
