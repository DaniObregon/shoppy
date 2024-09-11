import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid } from '@chakra-ui/react';
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
    <Grid
      bg="#edf3f8"
      _dark={{ bg: "#3e3e3e" }}
      p={50}
      w="full"
      alignItems="flex-start"
      justifyContent="center"
      gap="5mm"
      templateColumns={{
        base: '1fr',        // 1 card por fila en pantallas pequeñas
        md: 'repeat(2, 1fr)',  // 2 cards por fila en pantallas medianas
        lg: 'repeat(3, 1fr)'   // 3 cards por fila en pantallas grandes
      }}
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
    </Grid>
  );
};
