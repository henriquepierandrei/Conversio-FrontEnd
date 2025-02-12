import axios from "axios";
import { getAccessToken, getRefreshToken, isAccessTokenValid, isRefreshTokenValid, setAccessToken, logout } from "./authService";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use(
  async (config) => {
    if (!isAccessTokenValid()) {
      if (isRefreshTokenValid()) {
        try {
          const response = await axios.post("http://localhost:8080/auth/refresh", {
            refreshToken: getRefreshToken(),
          });

          if (response.status === 200) {
            setAccessToken(response.data.accessToken);
            config.headers["Authorization"] = `Bearer ${response.data.accessToken}`;
          }
        } catch (err) {
          console.error("Erro ao renovar token", err);
          logout();
          return Promise.reject(err);
        }
      } else {
        logout();
        return Promise.reject(new Error("Sessão expirada. Faça login novamente."));
      }
    } else {
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
