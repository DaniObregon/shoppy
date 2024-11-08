import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct } from "../redux/slices/productSlice";
import { useParams, useNavigate } from "react-router-dom";
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
          <Grid templateColumns="3fr 1.5fr" gap="2" mt="4">
            {/* Left side: Image */}
            <GridItem
              ml="2"
              border="1px solid"
              borderColor="gray.200"
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
              borderColor="gray.200"
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
                <Text color="gray.600">
                  {product.availableQuantity} disponibles
                </Text>
                <Button colorScheme="teal" width="100%">
                  Agregar al carrito
                </Button>
                <Button variant="outline" width="100%">
                  Comprar ahora
                </Button>
                <Button variant="link" color="teal.500" width="100%">
                  ¡Resérvalo!
                </Button>
              </VStack>
            </GridItem>
          </Grid>

          {/* New Section for Product Details */}
          <Box
            mt="4"
            border="1px solid"
            borderColor="gray.200"
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
