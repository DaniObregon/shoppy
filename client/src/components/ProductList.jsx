import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Flex } from '@chakra-ui/react';
import { Card } from './Card';

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        console.log(response.data);
        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('Unexpected response format', response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Flex
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
      alignItems="flex-start"
      justifyContent="center"
      wrap="wrap"
      gap="5mm"
    >
      {products.map((product) => (
        <Card
          key={product.id}
          brand={product.brand}
          model={product.model}
          description={product.description}
          price={product.price}
          imgUrl={product.imgUrl}
        />
      ))}
    </Flex>
  );
};

