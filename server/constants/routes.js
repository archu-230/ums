const ROUTES = {
    API: {
        BASE_PATH: "/api/v1",

        AUTH: {
            BASE_PATH: "/auth",
            SIGNUP: "/signup",
            LOGIN: "/login",
        },
        TOKEN: {
            BASE_PATH: "/token",
            ACCESS_TOKEN: "/access-token",
            REFRESH_TOKEN: "/refresh-token",
        },
    },
};

module.exports = ROUTES;