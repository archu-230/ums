const express = require("express");

const APPLICATION = require("./constants/applicationConstants");

const routes = require("./routes");

const errorHandler = require("./middleware/errorHandler");

const notFound = require("./middleware/notFound");

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(
    APPLICATION.API_VERSION,
    routes
);

app.use(notFound);

app.use(errorHandler);

module.exports = app;