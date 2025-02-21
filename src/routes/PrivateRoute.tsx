// PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import React, { useEffect } from "react"; // Importe o useEffect

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula uma verificação assíncrona
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <div></div>; // Exibe um loader enquanto verifica a autenticação
  }

  if (!isAuthenticated) {
    console.log("Usuário não autenticado, redirecionando para o login.");
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};


export default PrivateRoute;
