import { createContext, useEffect, useState } from "react";
import authService from "../services/auth.service";
import { getStoredUser, setStoredUser, clearStoredUser } from "../utils/tokenStorage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getStoredUser());
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            try {
                const { user: currentUser } = await authService.getCurrentUser();
                setUser(currentUser);
                setStoredUser(currentUser);
            } catch (error) {
                setUser(null);
                clearStoredUser();
            } finally {
                setIsLoading(false);
            }
        };

        restoreSession();
    }, []);

    const login = async (payload) => {
        const result = await authService.login(payload);
        setUser(result.user);
        setStoredUser(result.user);
        return result;
    };

    const signUp = async (payload) => {
        const result = await authService.signUp(payload);
        setUser(result.user);
        setStoredUser(result.user);
        return result;
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            setUser(null);
            clearStoredUser();
        }
    };

    const value = {
        user,
        isAuthenticated: Boolean(user),
        isLoading,
        login,
        signUp,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};