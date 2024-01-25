import { createContext, useContext, useState } from "react";
import { loginUser } from "../server/apiCalls";

const AuthContext = createContext();
// Auth.js
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (userData) => {
        try {
            const response = await loginUser(userData);
            setUser(response.user);
            return response.user;
        } catch (error) {
            console.error('Authentication error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
