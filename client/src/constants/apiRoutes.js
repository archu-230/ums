const API_ROUTES = {
    AUTH: {
        SIGNUP: "/auth/signup",
        LOGIN: "/auth/login",
        LOGOUT: "/auth/logout",
        REFRESH_TOKEN: "/auth/refresh-token",
        ME: "/auth/me",
    },
    PASSWORD: {
        SEND_OTP: "/password/otp/send",
        VERIFY_OTP: "/password/otp/verify",
        RESET_WITH_OTP: "/password/otp/reset",
        SEND_RESET_LINK: "/password/link/send",
        RESET_WITH_LINK: "/password/link/reset",
    },
    USERS: {
        BASE: "/users",
    },
};

export default API_ROUTES;