const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

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

app.use(cookieParser());

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(swaggerSpec)
);
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