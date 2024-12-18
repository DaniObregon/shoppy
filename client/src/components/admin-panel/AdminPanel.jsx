import React, { useEffect, useState } from "react";
import { Button, Box, Text, useDisclosure } from "@chakra-ui/react";
import { ConfirmDeleteDialog } from "./ConfirmDeleteDialog"; // Componente de confirmación de eliminación
import { ProductTable } from "./ProductTable";
import { ProductFormModal } from "./ProductFormModal";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import api from "../../config/axiosConfig";

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
  // const toast = useToast();
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

  return (
    <Box p={4}>
      <Text fontSize="2xl" fontWeight="bold" my={4}>
        Panel de Administración
      </Text>

      <Button
        colorScheme="teal"
        onClick={() => {
          setFormData({
            id: "",
            brand: "",
            model: "",
            description: "",
            price: "",
            imgUrl: "",
            stock: "",
          }); // Limpia el formulario
          onOpen();
        }}
        mb={4}
      >
        Agregar Producto
      </Button>

      <ProductTable
        products={products}
        onEdit={(product) => {
          setFormData(product); // Carga el producto seleccionado
          onOpen();
        }}
        onDelete={(productId) => {
          setProductToDelete(productId);
          openDeleteDialog();
        }}
      />
      {/* Modal para agregar o modificar producto */}
      <ProductFormModal
        isOpen={isOpen}
        onClose={onClose}
        onProductSave={() => setShouldReload(true)}
        initialData={formData}
      />

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
