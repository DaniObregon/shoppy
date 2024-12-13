import React, { useEffect } from "react";
import mercadolibreIcon from "../assets/mercadopagoIcon.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct } from "../redux/slices/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { TooltipBadge } from "./TooltipBadge";
import {
  Box,
  Image,
  Text,
  Button,
  Spinner,
  VStack,
  Grid,
  GridItem,
  Heading,
  Link,
  HStack,
  useColorModeValue,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";

export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: product,
    status,
    error,
  } = useSelector((state) => state.product);

  const borderColor = useColorModeValue("gray.200", "gray.900");
  const tableBorderColor = useColorModeValue("gray.200", "gray.700");
  const alternateRowColors = [
    useColorModeValue("gray.50", "gray.800"),
    useColorModeValue("gray.100", "gray.700"),
  ];

  useEffect(() => {
    dispatch(fetchProductById(id));

    return () => {
      dispatch(clearProduct());
    };
  }, [dispatch, id]);

  if (status === "loading") return <Spinner color="teal.500" />;
  if (status === "failed") return <Text color="red.500">Error: {error}</Text>;

  return (
    <Box padding="4" maxW="full" mx="auto">
      {product && (
        <>
          {/* Grid Principal */}
          <Grid
            templateColumns={{
              base: "1fr", // En móviles, colapsa a una sola columna
              md: "minmax(400px, 70%) minmax(300px, 30%)", // Define un ancho mínimo para las columnas
            }}
            gap="4"
            mt="4"
          >
            {/* Imagen */}
            <GridItem
              ml="2"
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              boxShadow="sm"
              display="flex"
              justifyContent="center"
              alignItems="center"
              padding="4"
            >
              <Image
                src={product.imgUrl}
                alt={product.model}
                borderRadius="md"
                width="80%"
              />
            </GridItem>
            {/* Zona de compra */}
            <GridItem
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              boxShadow="sm"
              padding="4"
              ml={{ base: "0", md: "8" }} // Sin margen lateral en dispositivos móviles
            >
              <VStack align="start" spacing="4">
                <Heading
                  as="h2"
                  fontSize="2xl"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {product.name}
                </Heading>
                <Heading
                  as="h2"
                  fontSize="2xl"
                  fontWeight="bold"
                  textAlign="center"
                >
                  {product.brand} - {product.model}
                </Heading>
                <Text fontSize="xl" color="teal.500" fontWeight="bold">
                  ${product.price}
                </Text>
                <Link color="blue.300" fontWeight="bold" fontStyle="italic">
                  Elegir forma de pago
                </Link>
                <Text color="gray.600">{product.stock} disponibles</Text>

                <Box
                  border="1px solid"
                  borderColor={borderColor}
                  borderRadius="md"
                  boxShadow="lg"
                  padding="4"
                  width="100%"
                  mt="2"
                >
                  <VStack spacing="5" align="start">
                    <HStack spacing="3" align="center">
                      <Image
                        src={mercadolibreIcon}
                        alt="Mercado Pago"
                        boxSize="50px"
                      />
                      <Text color="gray.600" fontSize="m">
                        Procesamos tu compra a través de Mercado Pago.
                      </Text>
                    </HStack>
                    <Button colorScheme="teal" width="100%">
                      Agregar al carrito
                    </Button>
                    <Button variant="outline" width="100%">
                      Comprar ahora
                    </Button>
                    <Button
                      fontSize="l"
                      variant="link"
                      color="teal.500"
                      width="100%"
                      textAlign="center" // Ajusta el texto al inicio
                      whiteSpace="normal" // Permite que el texto se divida en varias líneas
                      wordBreak="break-word" // Rompe palabras largas si es necesario
                    >
                      ¡Te lo enviamos gratis con la primer cuota!
                    </Button>
                    <TooltipBadge text="Envío gratis en compras a partir de $30.000." />
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
            {/* Características principales */}
            <GridItem colSpan={{ base: 1, md: 2 }}>
              {" "}
              {/* Ocupa todo el ancho en móviles */}
              <Box
                mt="10"
                padding="6"
                ml="2"
                borderTop="1px solid"
                borderColor={borderColor}
              >
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="bold"
                  textAlign="left"
                  mb="4"
                  ml="5"
                  mt="5"
                >
                  Características Principales
                </Heading>
                <Box
                  border="1px solid"
                  borderColor={tableBorderColor}
                  borderRadius="md"
                  overflow="hidden"
                  mt="4"
                >
                  <Table variant="simple" width="100%">
                    <Tbody>
                      {[
                        { label: "Marca", value: product.brand },
                        { label: "Modelo", value: product.model },
                        { label: "Precio", value: `$${product.price}` },
                        {
                          label: "Disponibilidad",
                          value: `${product.stock} en stock`,
                        },
                      ].map((feature, index) => (
                        <Tr key={index} bg={alternateRowColors[index % 2]}>
                          <Td fontWeight="bold" borderColor={tableBorderColor}>
                            {feature.label}
                          </Td>
                          <Td borderColor={tableBorderColor}>
                            {feature.value}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </Box>
              </Box>
            </GridItem>
            {/* Zona de descripción */}
            <GridItem>
              <Box mt="10" padding="6" ml="2">
                <Heading
                  as="h3"
                  fontSize="xl"
                  fontWeight="bold"
                  textAlign="left"
                  mb="4"
                  ml="5"
                  mt="5"
                >
                  Descripción
                </Heading>
                <Box overflow="hidden" mt="4">
                  <Text fontSize="xl" color="gray.400" fontWeight="bold">
                    {product.description}
                  </Text>
                </Box>
              </Box>
            </GridItem>
          </Grid>
        </>
      )}
    </Box>
  );
};
