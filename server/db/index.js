const mongoose = require("mongoose");

const APPLICATION = require("../constants/application");
const logger = require("../config/logger");
const MESSAGES = require("../constants/messages");

const connect = async () => {
    try {
        await mongoose.connect(APPLICATION.MONGODB_URI);

        logger.info(
            MESSAGES.DATABASE.CONNECTION_SUCCESS
        );
    } catch (error) {
        logger.error(
            MESSAGES.DATABASE.CONNECTION_FAILED
        );

        logger.error(error.message);
        process.exit(1);
    }
};

module.exports = {
    connectMongoDB: connect,
};