import axios from "axios";
import ENV from "../config/env";
import API_ROUTES from "../constants/apiRoutes";
const axiosClient = axios.create({ baseURL: ENV.API_BASE_URL, });
const refreshClient = axios.create({ baseURL: ENV.API_BASE_URL, });
import {
    getAccessToken,
    getRefreshToken,
    setAccessToken,
    clearAuthStorage,
} from "../utils/tokenStorage";

let refreshPromise = null;

const requestNewAccessToken = () => {
    if (!refreshPromise) {
        refreshPromise = refreshClient
            .post(API_ROUTES.AUTH.REFRESH_TOKEN, {
                refreshToken: getRefreshToken(),
            })
            .then((response) => {
                const newAccessToken = response.data.data.accessToken;
                setAccessToken(newAccessToken);
                return newAccessToken;
            })
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
};

axiosClient.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response ? error.response.status : null;

        if (status === 401 && !originalRequest._retry && getRefreshToken()) {
            originalRequest._retry = true;

            try {
                const newAccessToken = await requestNewAccessToken();
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                clearAuthStorage();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default axiosClient; 