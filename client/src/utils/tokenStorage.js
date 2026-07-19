import STORAGE_KEYS from "../constants/storageKeys";

export const getAccessToken = () => localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
export const getRefreshToken = () => localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

export const getUser = () => {
    const value = localStorage.getItem(STORAGE_KEYS.USER);
    return value ? JSON.parse(value) : null;
};

export const setAccessToken = (token) => {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
};

export const setAuthData = ({ user, accessToken, refreshToken }) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
};

export const clearAuthStorage = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
};