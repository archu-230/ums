const ROUTES = {
    API: {
        BASE_PATH: "/api/v1",

        AUTH: {
            BASE_PATH: "/auth",
            SIGNUP: "/signup",
            LOGIN: "/login",
            LOGOUT: "/logout",
            ME: "/me",

        },
        PASSWORD: {
            BASE_PATH: "/password",

            SEND_OTP: "/otp/send",
            VERIFY_OTP: "/otp/verify",
            RESET_WITH_OTP: "/otp/reset",

    
            SEND_RESET_LINK: "/link/send",
            RESET_WITH_LINK: "/link/reset",
        },
        TOKEN: {
            BASE_PATH: "/token",
            ACCESS_TOKEN: "/access-token",
            REFRESH_TOKEN: "/refresh-token",
        },
        USER: {
            BASE_PATH: "/users",
            CREATE: "/",
            GET_ALL: "/",
            GET_BY_ID: "/:id",
            UPDATE: "/:id",
            DELETE: "/:id"
        },
    },
};

module.exports = ROUTES;