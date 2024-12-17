import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
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
  useToast,
} from "@chakra-ui/react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog"; // Componente de confirmación de eliminación
import { ProductTable } from "./ProductTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById, clearProduct } from "../redux/slices/productSlice";
import api from "../config/axiosConfig";

export const AdminPanel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: product } = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    brand: "",
    model: "",
    description: "",
    price: "",
    imgUrl: "",
    stock: "",
  });
  const [shouldReload, setShouldReload] = useState(false);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Estado para el diálogo de confirmación
  const {
    isOpen: isDeleteDialogOpen,
    onOpen: openDeleteDialog,
    onClose: closeDeleteDialog,
  } = useDisclosure();
  const [productToDelete, setProductToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/admin-api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (shouldReload) {
      const fetchProducts = async () => {
        try {
          const response = await api.get("/admin-api/products");
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
      fetchProducts();
      setShouldReload(false);
    }
  }, [shouldReload]);

  const handleDeleteProduct = async (id) => {
    // Agregar estado de carga durante la eliminación
    setIsDeleting(true);
    try {
      await api.delete(`/admin-api/products/${id}`);
      setProducts(products.filter((product) => product.id !== id));
      toast({
        title: "Producto eliminado",
        status: "success",
        duration: 3000,
      });
      setShouldReload(true);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast({
        title: "Error al eliminar",
        description: "Hubo un error al intentar eliminar el producto.",
        status: "error",
        duration: 3000,
      });
    } finally {
      setIsDeleting(false);
      closeDeleteDialog();
    }
  };

  const handleAddOrUpdateProduct = async () => {
    if (
      !formData.brand ||
      !formData.model ||
      !formData.price ||
      !formData.imgUrl ||
      !formData.name
    ) {
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
      let response;
      if (formData.id) {
        response = await api.put(
          `/admin-api/products/${formData.id}`,
          productData
        );
      } else {
        response = await api.post("/admin-api/products", productData);
      }
      toast({
        title: "Producto procesado",
        status: "success",
        duration: 3000,
      });
      setFormData({
        id: "",
        brand: "",
        model: "",
        description: "",
        price: "",
        imgUrl: "",
        name: "",
        stock: "",
      });
      onClose();
      setShouldReload(true);
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
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" my={4}>
        Panel de Administración
      </Text>

      <Button colorScheme="teal" onClick={onOpen} mb={4}>
        Agregar Producto
      </Button>

      <ProductTable
        products={products}
        onEdit={(product) => {
          setFormData(product);
          onOpen();
        }}
        onDelete={(productId) => {
          setProductToDelete(productId);
          openDeleteDialog();
        }}
      />
      {/* Modal para agregar o modificar producto */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {formData.id ? "Modificar Producto" : "Agregar Producto"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="name" mb={4}>
              <FormLabel>Nombre</FormLabel>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Nombre del producto"
              />
            </FormControl>
            <FormControl id="stock" mb={4}>
              <FormLabel>Stock</FormLabel>
              <Input
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                placeholder="Stock del producto"
              />
            </FormControl>
            <FormControl id="brand" mb={4}>
              <FormLabel>Marca</FormLabel>
              <Input
                type="text"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                placeholder="Marca del producto"
              />
            </FormControl>
            <FormControl id="model" mb={4}>
              <FormLabel>Modelo</FormLabel>
              <Input
                type="text"
                value={formData.model}
                onChange={(e) =>
                  setFormData({ ...formData, model: e.target.value })
                }
                placeholder="Modelo del producto"
              />
            </FormControl>
            <FormControl id="description" mb={4}>
              <FormLabel>Descripción</FormLabel>
              <Input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Descripción del producto"
              />
            </FormControl>
            <FormControl id="price" mb={4}>
              <FormLabel>Precio</FormLabel>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                placeholder="Precio del producto"
              />
            </FormControl>
            <FormControl id="imgUrl" mb={4}>
              <FormLabel>URL de Imagen</FormLabel>
              <Input
                type="text"
                value={formData.imgUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imgUrl: e.target.value })
                }
                placeholder="URL de la imagen del producto"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleAddOrUpdateProduct}
            >
              {formData.id ? "Guardar Cambios" : "Agregar Producto"}
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Diálogo de confirmación para eliminar producto */}
      <ConfirmDeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={() => handleDeleteProduct(productToDelete)}
        isDeleting={isDeleting}
      />
    </Box>
  );
};
