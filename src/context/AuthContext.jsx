import React from 'react';
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

let usuarios = [
    { username: "admin", password: "admin123", isAdmin: true, firstName: "Admin", lastName: "User", email: "admin@roomble.com" },
    { username: "nico", password: "nico123", isAdmin: false, firstName: "Nico", lastName: "García", email: "nico@roomble.com" },
    { username: "tomas", password: "tomas123", isAdmin: false, firstName: "Tomás", lastName: "López", email: "tomas@roomble.com" },
];

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {

        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));
        } else {
            localStorage.removeItem('user');
        }
    }, [user]);

    const login = (username, password) => {
        const buscarUsuario = usuarios.find(
            (u) => u.username === username && u.password === password
        );
        if (buscarUsuario) {
            const usuarioEncontrado = buscarUsuario
            setUser(usuarioEncontrado);
            return true;
        }
        return false;
    };

    const register = (formData) => {
        const { firstName, lastName, email, password } = formData;

        // Verificar si el email ya existe
        const usuarioExistente = usuarios.find(u => u.email === email);
        if (usuarioExistente) {
            console.log("El email ya está registrado");
            return false;
        }

        // Crear nuevo usuario
        const nuevoUsuario = {
            username: email.split('@')[0], // Usar el email como base para el username
            password: password,
            isAdmin: false,
            firstName: firstName,
            lastName: lastName,
            email: email
        };

        usuarios.push(nuevoUsuario);

        setUser(nuevoUsuario);

        return true;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('bookings');
        localStorage.removeItem('favoriteProperties');

    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);