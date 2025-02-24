import axios from "axios";

const API_URL = "http://localhost:8000/api";

const getToken = () => {
  const user = localStorage.getItem("user");
  const { token } = user ? JSON.parse(user) : null;
  return token;
};

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  response => response, // Si la respuesta es correcta, se devuelve tal cual
  async error => {
    if (error.response) {
      // Si el token expiró, redirigir al login
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
