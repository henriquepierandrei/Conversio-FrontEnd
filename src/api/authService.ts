import api from "./api";

// Interface para o tipo de resposta do login
interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

// Função para login
export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/api/v1/auth/login", { email, password });

    const { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn } = response.data;

    // Armazenando tokens no localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessTokenExpiresAt", (Date.now() + accessTokenExpiresIn * 1000).toString());
    localStorage.setItem("refreshTokenExpiresAt", (Date.now() + refreshTokenExpiresIn * 1000).toString());

    return response.data; // Dados do usuário autenticado
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};




// Função para setar o token de acesso
export const setAccessToken = (accessToken: string): void => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("accessToken", accessToken);
  }
};


// Função para obter o token de acesso
export const getAccessToken = (): string | null => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("accessToken");
  }
  return null;
};

// Função para obter o token de refresh
export const getRefreshToken = (): string | null => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem("refreshToken");
  }
  return null;
};

// Verifica se o token de acesso é válido
export const isAccessTokenValid = (): boolean => {
  const expiresAt = localStorage.getItem("accessTokenExpiresAt");
  return expiresAt ? Date.now() < Number(expiresAt) : false;
};

// Verifica se o token de refresh é válido
export const isRefreshTokenValid = (): boolean => {
  const expiresAt = localStorage.getItem("refreshTokenExpiresAt");
  return expiresAt ? Date.now() < Number(expiresAt) : false;
};

// Função para fazer logout
export const logout = (): void => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessTokenExpiresAt");
    localStorage.removeItem("refreshTokenExpiresAt");
  }
  
};







