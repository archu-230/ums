import { createContext, useState } from "react";
import authService from "../services/auth.service";
import { getAccessToken, getUser, setAuthData, clearAuthStorage } from "../utils/tokenStorage";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser());
    const [accessToken, setAccessToken] = useState(getAccessToken());

    const login = async (payload) => {
        const result = await authService.login(payload);
        setAuthData(result);
        setUser(result.user);
        setAccessToken(result.accessToken);
        return result;
    };

    const signUp = async (payload) => {
        const result = await authService.signUp(payload);
        setAuthData(result);
        setUser(result.user);
        setAccessToken(result.accessToken);
        return result;
    };

    const logout = () => {
        clearAuthStorage();
        setUser(null);
        setAccessToken(null);
    };

    const value = {
        user,
        accessToken,
        isAuthenticated: Boolean(accessToken),
        login,
        signUp,
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};