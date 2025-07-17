import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Cambiá esto según cómo definas si es admin
  const isAdmin = user?.isAdmin;

  if (!isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
