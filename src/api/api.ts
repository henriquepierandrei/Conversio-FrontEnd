import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { 
  getAccessToken, 
  getRefreshToken, 
  isAccessTokenValid, 
  isRefreshTokenValid, 
  setAccessToken, 
  logout 
} from "./authService";




// EXEMPLO DE RESPONSE LOGIN
// {
//     "accessToken": "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJBZ2lsaXplIiwic3ViIjoiZDRlNWUxMGQtYzkzNC00YjkyLTlmMmYtYzIzOTZhNGQ4YWRhIiwibGFzdExvZ2luIjoxNzM5NDA0ODIwNjY5LCJleHAiOjE3Mzk0MDU3MjAsImlhdCI6MTczOTQwNDgyMCwic2NvcGUiOiJVU0VSIn0.KWxsmNt9FVVXdwWrpB2BFfXAsa1XVh2CncJKD3Ak2sSQfzfyIFB_gLByjjiBZNjhzvd3S1FZAosbw9cYpR1SK6-KswpxCQDDIRqCE17KSrznmhchA523gpeE9stgaXHM8KyjZLBhDhGdd-1dMG1vIz7s1Pc-2BxxijZvhhKdDjtzW7-Nb1Ts1JnXfgYH0pU_WMH4E-Z16dsxQNvVtdFHraF6Q6NobwPXbNpf5hwZ8ZIi3gfZumhsImAeQpGj7yW01XMj9t_IoiQkKACPOij0xoPjRFnZKx2KdLeuFzFlgYRAgzw4cnMAQBmyIj8DgJtgnaExrVqY3r9m65QQ3fkmzA",
//     "refreshToken": "eyJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJDb252ZXJzaW8iLCJzdWIiOiJkNGU1ZTEwZC1jOTM0LTRiOTItOWYyZi1jMjM5NmE0ZDhhZGEiLCJleHAiOjE3NDE5OTY4MjAsImlhdCI6MTczOTQwNDgyMH0.SLkBNZpId959f3nsR6V6vGhUitCLzUWrRnfH-kiqhCj66lnddU8-SsYgp1eqWtowpI7hRBP-ifmKqWWsG7C9CTxdJVZjkTch0xbrtfAfEEaD1BepsKv5QfeyJm81-PZysqqmfQA9uQE2kzLt1Rl7GC-9Zedvv9WVRejGifK-78peUa5Na3IprRTYflpVxZU3d1H0Nw-FpwUrJm8ffswz97tOcGp_pCAZ_9CDwDdD3EGzX1SEx7BDpWKoz9jG-AVQFejMjKkDN5I5SQSSuWi9mbbruyr1GAa9hrMsjR2CJXYT_ofOYxnYvZA17bTvnSSAjvG1Ao3FKvGeNOcBWKxzhQ",
//     "accessTokenExpiresIn": 900,
//     "refreshTokenExpiresIn": 2592000
// }


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
      return Promise.reject(new Error("Token inválido. Redirecionando para login."));

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logout(); // Remove tokens inválidos
      window.location.href = "/login"; // Redireciona para login
    }
    return Promise.reject(error);
  }
);



export default api;
