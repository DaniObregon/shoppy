import { createSlice } from "@reduxjs/toolkit";

// Estado inicial del usuario
const initialState = {
  name: null,
  email: null,
  role_id: null, // Agregamos el role_id
  token: null,  // Agregamos el token
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login: (state, action) => {
      // Guarda los datos del usuario en el estado redux
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role_id = action.payload.role_id; // Asignamos el role_id
      state.token = action.payload.token;     // Asignamos el token
    },
    logout: (state) => {
      // Limpia el estado al cerrar sesión
      state.name = null;
      state.email = null;
      state.role_id = null; // Reseteamos el role_id
      state.token = null;   // Limpiamos el token
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
