import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { parseCookies, setCookie } from "nookies";

// Contexto de autenticação
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean; // Novo estado para controlar o carregamento
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Estado de carregamento

  // Função para verificar a autenticação
  const checkAuth = () => {
    const token = parseCookies()["accessToken"];
    console.log("Token encontrado:", token); // Verifique se o token está sendo recuperado
    if (token) {
      console.log("Token existe, autenticando...");
      setIsAuthenticated(true);
    } else {
      console.log("Token não encontrado, usuário não autenticado.");
      setIsAuthenticated(false);
    }
    setIsLoading(false); // Finaliza o carregamento após verificar a autenticação
  };

  // Verifica a autenticação ao carregar o componente
  useEffect(() => {
    checkAuth(); // Verifica a autenticação ao carregar
  }, []);

  // Função de login
  const login = async (token: string) => {
    setCookie(null, "accessToken", token, {
      maxAge: 30 * 24 * 60 * 60, // 30 dias
      path: "/",
    });
    console.log("Token salvo:", parseCookies()["accessToken"]); // Verifica se o token foi salvo corretamente
    await checkAuth(); // Aguarda a verificação da autenticação
  };

  // Função de logout
  const logout = () => {
    setIsAuthenticated(false);
    setCookie(null, "accessToken", "", {
      maxAge: -1, // Remove o cookie
      path: "/",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};