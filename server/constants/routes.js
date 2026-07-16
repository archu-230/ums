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