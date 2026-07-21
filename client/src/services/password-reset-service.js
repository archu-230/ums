import axiosClient from "../api/axiosClient";
import API_ROUTES from "../constants/apiRoutes";


const sendOtp = async (email) => {
    const response = await axiosClient.post(
        API_ROUTES.PASSWORD.SEND_OTP,
        { email }
    );
    return response.data;
};

const verifyOtp = async ({ email, otp }) => {
    const response = await axiosClient.post(
        API_ROUTES.PASSWORD.VERIFY_OTP,
        { email, otp }
    );
    return response.data;
};

const resetWithOtp = async ({ email, otp, newPassword }) => {
    const response = await axiosClient.post(
        API_ROUTES.PASSWORD.RESET_WITH_OTP,
        { email, otp, newPassword }
    );
    return response.data;
};



const sendResetLink = async (email) => {
    const response = await axiosClient.post(
        API_ROUTES.PASSWORD.SEND_RESET_LINK,
        { email }
    );
    return response.data;
};

const resetWithLink = async ({ token, newPassword }) => {
    const response = await axiosClient.post(
        API_ROUTES.PASSWORD.RESET_WITH_LINK,
        { token, newPassword }
    );
    return response.data;
};

export default {
    sendOtp,
    verifyOtp,
    resetWithOtp,
    sendResetLink,
    resetWithLink,
};