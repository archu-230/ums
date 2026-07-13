const cors = require("cors");

const corsConfig = cors({
    origin: "*",
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