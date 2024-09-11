import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Importa la instancia de autenticación
import axios from 'axios';


export const Auth = ({ onAuthSuccess }) => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Datos del usuario recuperados de Google
      const userData = {
        name: user.displayName, // Nombre del usuario
        email: user.email, // Email del usuario
        role_id: 1, // Rol por defecto (cliente)
      };

      // Enviar los datos del usuario al backend para crear o verificar el usuario en la base de datos
      await axios.post('/api/auth/google/callback', userData);

      // Si la autenticación y la creación del usuario son exitosas
      if (onAuthSuccess) {
        onAuthSuccess(user);
      }
      navigate('/'); // Redirige al home o a la ruta que prefieras después de autenticarse
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  return (
    <Button colorScheme="pink" onClick={handleSignIn}>
      Sign in with Google
    </Button>
  );
};
