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
  Stack,
  Heading,
  Link,
  HStack,
  useColorModeValue,
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
          <Grid templateColumns="70% 30%" gap="2" mt="4">
            {/* Left side: Image */}
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

            {/* Right side: Price, Buttons */}
            <GridItem
              border="1px solid"
              borderColor={borderColor}
              borderRadius="md"
              boxShadow="sm"
              padding="4"
              ml="8"
            >
              <VStack align="start" spacing="4">
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
                <Text color="gray.600">
                  {product.availableQuantity} disponibles
                </Text>

                {/* New styled box for buttons and Mercado Pago info */}
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
                    >
                      ¡Resérvalo!
                    </Button>
                    {/* TooltipBadge for free shipping message */}
                    <TooltipBadge text="Envío gratis en compras a partir de $30.000." />
                  </VStack>
                </Box>
              </VStack>
            </GridItem>
          </Grid>

          {/* New Section for Product Details */}
          <Box
            mt="4"
            border="1px solid"
            borderColor={borderColor}
            borderRadius="md"
            boxShadow="sm"
            padding="4"
            ml="2"
          >
            <Stack spacing="2">
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {product.brand} - {product.model}
              </Text>
              <Text color="gray.600" textAlign="center">
                {product.description}
              </Text>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
};
