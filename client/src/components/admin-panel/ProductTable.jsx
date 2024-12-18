import React from "react";
import { Button, Table, Thead, Tbody, Tr, Th, Td, Box } from "@chakra-ui/react";

export const ProductTable = ({ products, onEdit, onDelete }) => {
  return (
    <Table variant="striped" colorScheme="gray">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Nombre</Th>
          <Th>Marca</Th>
          <Th>Modelo</Th>
          <Th>Descripción</Th>
          <Th>Precio</Th>
          <Th>Stock</Th>
          <Th>Acciones</Th>
        </Tr>
      </Thead>
      <Tbody>
        {products.map((product) => (
          <Tr key={product.id}>
            <Td>{product.id}</Td>
            <Td>{product.name}</Td>
            <Td>{product.brand}</Td>
            <Td>{product.model}</Td>
            <Td
              maxWidth={{ base: "100px", md: "200px", lg: "300px" }}
              whiteSpace="normal"
              overflow="hidden"
              wordBreak="break-word"
            >
              {product.description}
            </Td>
            <Td>${product.price}</Td>
            <Td>{product.stock}</Td>
            <Td>
              <Box display="flex" gap={2}>
                <Button
                  colorScheme="yellow"
                  size="sm"
                  mr={2}
                  onClick={() => onEdit(product)}
                >
                  Modificar
                </Button>
                <Button
                  colorScheme="red"
                  size="sm"
                  onClick={() => onDelete(product.id)}
                >
                  Eliminar
                </Button>
              </Box>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
