const app = require("./app");

const logger = require("./config/logger");

const APPLICATION = require("./constants/applicationConstants");

app.listen(
    APPLICATION.PORT,
    () => {

        logger.info(
            `Server Running On Port ${APPLICATION.PORT}`
        );
    }
);