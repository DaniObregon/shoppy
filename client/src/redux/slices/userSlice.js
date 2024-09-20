// /client/src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Estado inicial del usuario
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload; // Guardar los datos del usuario en el estado
    },
    logout: (state) => {
      state.user = null; // Limpiar el estado al cerrar sesión
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
