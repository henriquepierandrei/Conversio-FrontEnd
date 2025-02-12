import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { 
  getAccessToken, 
  getRefreshToken, 
  isAccessTokenValid, 
  isRefreshTokenValid, 
  setAccessToken, 
  logout 
} from "./authService";

// Criação da instância do axios
const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (!isAccessTokenValid()) {
      // Se o accessToken não é válido, redireciona para o login
      window.location.href = "/login"; 
    } else {
      // Se o token for válido, inclui no cabeçalho da requisição
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default api;
