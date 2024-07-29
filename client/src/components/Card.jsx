import React from "react";
import { chakra, Box, Flex } from "@chakra-ui/react";

export const Card = () => {
  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
      alignItems="flex-start" // Alinea el contenido al principio
      justifyContent="center"
      wrap="wrap" // Esta línea permite que los elementos se envuelvan en lugar de superponerse
      gap="5mm"
    >
      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={{ base: "full", md: "sm" }}
        mx="auto"
        mb={4} // Agrega un margen inferior para separar las tarjetas en pantallas más pequeñas
      >
        <Box
          bg="gray.300"
          h={64}
          w="full"
          rounded="lg"
          shadow="md"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80)",
          }}
        ></Box>

        <Box
          w={{ base: 56, md: 64 }}
          bg="white"
          _dark={{ bg: "gray.800" }}
          mt={-10}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <chakra.h3
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color="gray.800"
            _dark={{ color: "white" }}
            letterSpacing={1}
          >
            Nike
          </chakra.h3>
          <chakra.p
            py={1}
            textAlign="center"
            fontWeight="medium"
            color="gray.600"
            _dark={{ color: "gray.300" }}
            fontSize="sm"
          >
            Revolt
          </chakra.p>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            py={2}
            px={3}
            bg="gray.200"
            _dark={{ bg: "gray.700" }}
          >
            <chakra.span
              fontWeight="bold"
              color="gray.800"
              _dark={{ color: "gray.200" }}
            >
              $129
            </chakra.span>
            <chakra.button
              bg="gray.800"
              fontSize="xs"
              fontWeight="bold"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: "gray.700",
                _dark: { bg: "gray.600" },
              }}
              _focus={{
                bg: "gray.700",
                _dark: { bg: "gray.600" },
                outline: "none",
              }}
            >
              Add to cart
            </chakra.button>
          </Flex>
        </Box>
      </Flex>

      <Flex
        direction="column"
        justifyContent="center"
        alignItems="center"
        w={{ base: "full", md: "sm" }}
        mx="auto"
        mb={4} // Agrega un margen inferior para separar las tarjetas en pantallas más pequeñas
      >
        <Box
          bg="gray.300"
          h={64}
          w="full"
          rounded="lg"
          shadow="md"
          bgSize="cover"
          bgPos="center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1539185441755-769473a23570?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}
        ></Box>

        <Box
          w={{ base: 56, md: 64 }}
          bg="white"
          _dark={{ bg: "gray.800" }}
          mt={-10}
          shadow="lg"
          rounded="lg"
          overflow="hidden"
        >
          <chakra.h3
            py={2}
            textAlign="center"
            fontWeight="bold"
            textTransform="uppercase"
            color="gray.800"
            _dark={{ color: "white" }}
            letterSpacing={1}
          >
            New Balance
          </chakra.h3>
          <chakra.p
            py={1}
            textAlign="center"
            fontWeight="medium"
            color="gray.600"
            _dark={{ color: "gray.300" }}
            fontSize="sm"
          >
            574 Classic. Este producto cuenta con una nueva base que te canta lalaallalalalala
          </chakra.p>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            py={2}
            px={3}
            bg="gray.200"
            _dark={{ bg: "gray.700" }}
          >
            <chakra.span
              fontWeight="bold"
              color="gray.800"
              _dark={{ color: "gray.200" }}
            >
              $129
            </chakra.span>
            <chakra.button
              bg="gray.800"
              fontSize="xs"
              fontWeight="bold"
              color="white"
              px={2}
              py={1}
              rounded="lg"
              textTransform="uppercase"
              _hover={{
                bg: "gray.700",
                _dark: { bg: "gray.600" },
              }}
              _focus={{
                bg: "gray.700",
                _dark: { bg: "gray.600" },
                outline: "none",
              }}
            >
              Add to cart
            </chakra.button>
          </Flex>
        </Box>
      </Flex>
    </Flex>
  );
};
