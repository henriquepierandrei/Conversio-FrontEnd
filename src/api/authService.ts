import api from "./api";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
  refreshTokenExpiresIn: number;
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", { email, password });

    const { accessToken, refreshToken, accessTokenExpiresIn, refreshTokenExpiresIn } = response.data;

    // Armazenando tokens e tempos de expiração
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("accessTokenExpiresAt", (Date.now() + accessTokenExpiresIn * 1000).toString());
    localStorage.setItem("refreshTokenExpiresAt", (Date.now() + refreshTokenExpiresIn * 1000).toString());

    return response.data; // Retorna os dados do usuário autenticado
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const getAccessToken = (): string | null => localStorage.getItem("accessToken");

export const getRefreshToken = (): string | null => localStorage.getItem("refreshToken");

export const isAccessTokenValid = (): boolean => {
  const expiresAt = localStorage.getItem("accessTokenExpiresAt");
  return expiresAt ? Date.now() < Number(expiresAt) : false;
};

export const isRefreshTokenValid = (): boolean => {
  const expiresAt = localStorage.getItem("refreshTokenExpiresAt");
  return expiresAt ? Date.now() < Number(expiresAt) : false;
};

export const logout = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("accessTokenExpiresAt");
  localStorage.removeItem("refreshTokenExpiresAt");
};
