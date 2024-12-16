import axios from "axios";
import { store } from "../redux/store";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://shoppy-g5bu.onrender.com" // URL base para producción
      : "http://localhost:5000", // URL base para desarrollo
});

// Interceptor para agregar el token a cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = store.getState().userInfo.token; // Obtener el token desde Redux
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Agregar token en el header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
