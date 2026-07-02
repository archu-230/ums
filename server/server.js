require("dotenv").config();

const app = require("./app");

const logger = require("./config/logger");

const APPLICATION = require("./constants/application");

app.listen(
    APPLICATION.PORT,
    () => {

        logger.info(
            `Server Running On Port ${APPLICATION.PORT}`
        );
    }
);