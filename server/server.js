const express = require("express");
const logger = require("./config/logger");

const app = express();

app.get("/", (req, res) => {
    logger.info("Home route accessed");
    res.send("Server is Running...");
});

app.get("/error", (req, res) => {
    logger.error("This is a test error");
    res.status(500).send("Error logged");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});