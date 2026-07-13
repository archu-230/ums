require("dotenv").config();

const { app, port } = require("./app");
const { connectMongoDB } = require("./db");

const logger = require("./config/logger");

const startServer = async () => {
    await connectMongoDB();

    app.listen(port, () => {
        logger.info(`Server Running On Port ${port}`);
    });
};

startServer();