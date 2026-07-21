import axiosClient from "../api/axiosClient";
import API_ROUTES from "../constants/apiRoutes";

const signUp = async (payload) => {
    const response = await axiosClient.post(
        API_ROUTES.AUTH.SIGNUP,
        payload
    );
    return response.data.data;
};

const login = async (payload) => {
    const response = await axiosClient.post(
        API_ROUTES.AUTH.LOGIN,
        payload
    );
    return response.data.data;
};

const logout = async () => {
    const response = await axiosClient.post(API_ROUTES.AUTH.LOGOUT);
    return response.data;
};

const getCurrentUser = async () => {
    const response = await axiosClient.get(API_ROUTES.AUTH.ME);
    return response.data.data;
};

export default {
    signUp,
    login,
    logout,
    getCurrentUser,
};