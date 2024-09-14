import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebaseConfig"; // Importa la instancia de autenticación
import axios from "axios";

export const Auth = ({ onAuthSuccess }) => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const token = await user.getIdToken();

      const userData = {
        name: user.displayName, // Nombre del usuario
        email: user.email, // Email del usuario
        role_id: 1, // Rol por defecto (cliente)
      };

      await axios.post(
        "/api/auth/signup",
        JSON.stringify(userData), // Separar el body de la solicitud
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Enviar el token en un header
          },
        }
      );

      // Si la autenticación y la creación del usuario son exitosas
      if (onAuthSuccess) {
        onAuthSuccess(user); // Llamar a la función si está definida
      }
      navigate("/"); // Redirige al home o a la ruta que prefieras después de autenticarse
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  return (
    <Button
      onClick={signUpWithGoogle}
      as={"a"}
      display={{ base: "none", md: "inline-flex" }}
      fontSize={"sm"}
      fontWeight={600}
      color={"white"}
      bg={"pink.400"}
      href={"#"}
      _hover={{
        bg: "pink.300",
      }}
    >
      Sign Up
    </Button>
  );
};
