import React from "react";
import { Box, Badge, Image, HStack, Text } from "@chakra-ui/react";
import entregaIcon from "../assets/envioIcon.png";

export const TooltipBadge = ({ text }) => {
  return (
    <Box position="relative" display="inline-block" mt={8} width="100%">
      <Badge
        bg="white"
        color="gray.700"
        p={4}
        borderRadius="md"
        boxShadow="lg"
        border="1px solid"
        borderColor="gray.200"
        fontSize="md"
        fontWeight="bold"
        textAlign="center"
        width="100%"
        lineHeight="1.3"
        whiteSpace="normal"
        overflow="hidden"
      >
        <HStack spacing={2} align="center" justify="center">
          <Image src={entregaIcon} alt="Entrega" boxSize="40px" />
          <Text
            fontSize="sm"
            textAlign="center"
            whiteSpace="normal"
            wordBreak="break-word"
          >
            {text}
          </Text>
        </HStack>
      </Badge>
    </Box>
  );
};
