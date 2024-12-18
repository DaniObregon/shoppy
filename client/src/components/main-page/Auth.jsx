import api from "../../config/axiosConfig"
import React from "react";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { SignUpButton } from "./SignUpButton";
import { SignOutButton } from "./SignOutButton";
import { useNavigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../../redux/slices/userSlice";
import { Flex, Text, Stack } from "@chakra-ui/react";

export const Auth = ({ onAuthSuccess }) => {
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Obtiene el estado del usuario desde Redux (obtiene los datos)
  const userInfo = useSelector((state) => state.userInfo);

  const signUpWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      const userData = {
        name: user.displayName,
        email: user.email,
        role_id: 1, // Rol por defecto (client)
        token: token, // Guardamos el token aquí
      };

      //console.log("Datos que se envían al backend:", userData);

      const response = await api.post(
        "/api/auth/signup",
        JSON.stringify(userData),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // El token se envia en un header
          },
        }
      );

      //console.log("Respuesta del backend:", response.data);

      // Accede a las propiedades del objeto `user` desde la respuesta del backend
      const { name, email, role } = response.data.user;

      //console.log("Datos recibidos del backend:", { name: name, email: email, role: role });

      // Actualizar el estado global de Redux con los datos del usuario incluyendo el token
      dispatch(
        login({
          name: name,
          email: email,
          role_id: role,
          token: token,
        })
      );

      // Si la autenticación y la creación del usuario son exitosas
      if (onAuthSuccess) {
        onAuthSuccess(user); // Llamar a la función si está definida
      }
      navigate("/"); // Redirige al home después de autenticarse (o cambiar ruta)
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      dispatch(logout()); // Despachar la acción de logout en Redux
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Flex align="center" justify="center" p={4}>
      {userInfo.name ? (
        <Stack direction="row" align="center" spacing={4}>
          <Text
            p={2}
            color="gray.600"
            whiteSpace="nowrap"
            maxWidth="200px"
            overflow="hidden"
            textOverflow="ellipsis"
            fontSize={"m"}
          >
            Hola, {userInfo.name.split(" ")[0]}
          </Text>
          <SignOutButton onClick={signOutUser} />
        </Stack>
      ) : (
        <SignUpButton onClick={signUpWithGoogle} />
      )}
    </Flex>
  );
};
