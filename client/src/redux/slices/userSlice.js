import { createSlice } from "@reduxjs/toolkit";

// Estado inicial del usuario
const initialState = {
  name: null,
  email: null,
};

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    login: (state, action) => {
      // Guarda los datos del usuario en el estado redux
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
    logout: (state) => {
      // Limpia el estado al cerrar sesión
      state.name = null;
      state.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
