// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si viene un children, lo renderizamos; si no, usamos <Outlet /> para rutas anidadas
  return children ? children : <Outlet />;
};

export default ProtectedRoute;
