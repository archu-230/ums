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

const refreshAccessToken = async (refreshToken) => {
    const response = await axiosClient.post(
        API_ROUTES.AUTH.REFRESH_TOKEN,
        {
            refreshToken,
        });
    return response.data.data;
};

export default {
    signUp,
    login,
    refreshAccessToken,
};