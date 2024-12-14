import React from "react";
import { Flex, Text } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Flex
      as="header"
      align="center"
      justify="center"
      bg="blue.500"
      color="white"
      p="1"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999"
      boxShadow="md"
    >
      <Text fontSize="sm" fontWeight="bold" mr="4">
        Whatsapp 11 8888-8888
      </Text>
      <Text fontSize="sm" mr="4">
        Showroom Av. J.B. Justo 0000
      </Text>
      <Text fontSize="sm" mr="4">
        Lunes a Viernes de 9 a 17.30hs.
      </Text>
    </Flex>
  );
};
