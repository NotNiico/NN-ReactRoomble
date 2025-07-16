import React, { use, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login')
        }
    }, [user, navigate]);

    if(!user) return null; // Si no hay usuario, no renderiza nada

    return (
        <div>
            <h2>Bienvenido {user.username}</h2>
            <p>{user.isAdmin ? "Sos administrador." : "Sos usuario estándar."}</p>
            <button onClick={logout}>Cerrar sesión</button>
            
        </div>
    );
};


export default Dashboard;