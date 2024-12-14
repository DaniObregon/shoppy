import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://shoppy-g5bu.onrender.com" // URL base para producción
      : "http://localhost:5000", // URL base para desarrollo
});

export default api;
