import axiosClient from "../api/axiosClient";
import API_ROUTES from "../constants/apiRoutes";

const getUsers = async (params) => {
    const response = await axiosClient.get(
        API_ROUTES.USERS.BASE,
        { params }
    );
    return response.data.data;
};

const getUserById = async (id) => {
    const response = await axiosClient.get(
        `${API_ROUTES.USERS.BASE}/${id}`
    );
    return response.data.data;
};

const createUser = async (payload) => {
    const response = await axiosClient.post(
        API_ROUTES.USERS.BASE,
        payload
    );
    return response.data.data;
};

const updateUser = async (id, payload) => {
    const response = await axiosClient.put(
        `${API_ROUTES.USERS.BASE}/${id}`,
        payload
    );
    return response.data.data;
};

const deleteUser = async (id) => {
    const response = await axiosClient.delete(
        `${API_ROUTES.USERS.BASE}/${id}`);
    return response.data;
};

export default {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
};