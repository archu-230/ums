const express = require("express");
const helmet = require("helmet");
const compression = require("compression");

const MESSAGES = require("./constants/messages");
const routes = require("./routes");
const ROUTES = require("./constants/routes");
const APPLICATION = require("./constants/application");
const corsConfig = require("./config/cors");
const { globalApiLimiter } = require("./config/rate-limiters");
const globalErrorHandler = require("./middleware/global-error-handler");
const { NotFoundException } = require("./lib/http-exceptions");

const app = express();

app.use(helmet());

app.use(corsConfig);

app.use(compression());

app.use(express.json());

app.use(globalApiLimiter);

app.use(
    ROUTES.API.BASE_PATH,
    routes
);

app.use((req, res, next) => {
    next(
        new NotFoundException(
            MESSAGES.APPLICATION.ROUTE_NOT_FOUND
        )
    );
});

app.use(globalErrorHandler);

module.exports = {
    app,
    port: APPLICATION.PORT,
};