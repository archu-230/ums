import STORAGE_KEYS from "../constants/storageKeys";

export const getStoredUser = () => {
    const value = localStorage.getItem(STORAGE_KEYS.USER);
    return value ? JSON.parse(value) : null;
};

export const setStoredUser = (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

export const clearStoredUser = () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
};