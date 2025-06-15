import { createContext } from "react";

const AuthContext = createContext({ user: {
    id: 1,
    name: "Nico Carbone",
    email: "nicolas.carbone@gmail.com"
} });

export default AuthContext;