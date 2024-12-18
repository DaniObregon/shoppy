import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import api from "../config/axiosConfig";

export const ProductFormModal = ({ isOpen, onClose, onProductSave, initialData }) => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    id: "",
    brand: "",
    model: "",
    description: "",
    price: "",
    imgUrl: "",
    name: "",
    stock: "",
  });

  // Sincroniza initialData con formData
  useEffect(() => {
    if (isOpen) {
      if (initialData && initialData.id) {
        setFormData(initialData); // Modo edición
      } else {
        setFormData({
          id: "",
          brand: "",
          model: "",
          description: "",
          price: "",
          imgUrl: "",
          name: "",
          stock: "",
        }); // Limpia el formulario en modo agregar
      }
    }
  }, [isOpen, initialData]);
  

  const handleSubmit = async () => {
    if (!formData.brand || !formData.model || !formData.price || !formData.imgUrl || !formData.name) {
      toast({
        title: "Error",
        description: "Todos los campos son obligatorios.",
        status: "error",
        duration: 3000,
      });
      return;
    }

    const productData = {
      ...formData,
      stock: formData.stock || 0,
    };

    try {
      if (formData.id) {
        await api.put(`/admin-api/products/${formData.id}`, productData);
      } else {
        await api.post("/admin-api/products", productData);
      }

      toast({
        title: "Producto procesado",
        status: "success",
        duration: 3000,
      });
      onProductSave();
      onClose();
    } catch (error) {
      console.error("Error adding/updating product:", error);
      toast({
        title: "Error",
        description: "Hubo un error al agregar o actualizar el producto.",
        status: "error",
        duration: 3000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{formData.id ? "Modificar Producto" : "Agregar Producto"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="name" mb={4}>
            <FormLabel>Nombre</FormLabel>
            <Input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Nombre del producto"
            />
          </FormControl>
          <FormControl id="stock" mb={4}>
            <FormLabel>Stock</FormLabel>
            <Input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="Stock del producto"
            />
          </FormControl>
          <FormControl id="brand" mb={4}>
            <FormLabel>Marca</FormLabel>
            <Input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
              placeholder="Marca del producto"
            />
          </FormControl>
          <FormControl id="model" mb={4}>
            <FormLabel>Modelo</FormLabel>
            <Input
              type="text"
              value={formData.model}
              onChange={(e) => setFormData({ ...formData, model: e.target.value })}
              placeholder="Modelo del producto"
            />
          </FormControl>
          <FormControl id="description" mb={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Descripción del producto"
            />
          </FormControl>
          <FormControl id="price" mb={4}>
            <FormLabel>Precio</FormLabel>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="Precio del producto"
            />
          </FormControl>
          <FormControl id="imgUrl" mb={4}>
            <FormLabel>URL de Imagen</FormLabel>
            <Input
              type="text"
              value={formData.imgUrl}
              onChange={(e) => setFormData({ ...formData, imgUrl: e.target.value })}
              placeholder="URL de la imagen del producto"
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={handleSubmit}>
            {formData.id ? "Guardar Cambios" : "Agregar Producto"}
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
