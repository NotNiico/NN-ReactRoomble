import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx'

const AdminRoute = (children) => {

    const { user } = useAuth();

    if (!user || !user.isAdmin ) {
        return <Navigate to ="/login" replace />;
    }

  return children; // Si hay usuario autenticado y es admin, renderiza los hijos (la ruta protegida)
};

export default AdminRoute;