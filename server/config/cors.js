const cors = require("cors");
const ENV = require("../constants/env");

const corsConfig = cors({
    origin: ENV.CLIENT_URL,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
    ],
    credentials: true,
});

module.exports = corsConfig;