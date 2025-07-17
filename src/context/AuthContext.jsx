import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/UserApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = async (email, password) => {
        try {
            const user = await loginUser(email, password);
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user)); 
            return true;
        } catch (error) {
            console.error("Login fallido:", error.message);
            return false;
        }
    };

    const register = async (formData) => {
        try {
            const user = await registerUser(formData);
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user)); 
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("bookings");
        localStorage.removeItem("favoriteProperties");
    };

    return (
        <AuthContext.Provider
            value={{ user, login, logout, register, isAuthenticated: !!user }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
