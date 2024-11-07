import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct } from "../redux/slices/productSlice";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Image, Text, Button, Spinner } from "@chakra-ui/react";

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
    <Box padding="4" maxW="md" mx="auto">
      <Button onClick={() => navigate("/")}>Regresar a MainPage</Button>
      {product && (
        <Box mt="4">
          <Image src={product.imgUrl} alt={product.model} borderRadius="md" />
          <Text fontSize="2xl" fontWeight="bold" mt="4">
            {product.brand} - {product.model}
          </Text>
          <Text color="gray.600" mt="2">
            {product.description}
          </Text>
          <Text fontSize="xl" color="teal.500" fontWeight="bold" mt="4">
            ${product.price}
          </Text>
        </Box>
      )}
    </Box>
  );
};
