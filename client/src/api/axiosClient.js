import axios from "axios";
import ENV from "../config/env";
import API_ROUTES from "../constants/apiRoutes";
import { clearStoredUser } from "../utils/tokenStorage";

const axiosClient = axios.create({
    baseURL: ENV.API_BASE_URL,
    withCredentials: true,
});

const refreshClient = axios.create({
    baseURL: ENV.API_BASE_URL,
    withCredentials: true,
});

let refreshPromise = null;

const requestNewAccessToken = () => {
    if (!refreshPromise) {
        refreshPromise = refreshClient
            .post(API_ROUTES.AUTH.REFRESH_TOKEN)
            .finally(() => {
                refreshPromise = null;
            });
    }
    return refreshPromise;
};

const isAuthEndpoint = (url) =>
    url === API_ROUTES.AUTH.LOGIN ||
    url === API_ROUTES.AUTH.SIGNUP ||
    url === API_ROUTES.AUTH.REFRESH_TOKEN;

axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        const status = error.response ? error.response.status : null;

        if (
            status === 401 &&
            !originalRequest._retry &&
            !isAuthEndpoint(originalRequest?.url)
        ) {
            originalRequest._retry = true;

            try {
                await requestNewAccessToken();
                return axiosClient(originalRequest);
            } catch (refreshError) {
                clearStoredUser();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
)

export default axiosClient;