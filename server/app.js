const express = require("express");

const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");
const { httpError, StatusCodes } = require("./lib/httpError");

const app = express();

app.use(express.json());
app.use("/api/v1", routes);
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

module.exports = app;