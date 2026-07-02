const winston = require("winston");
const filePaths = require("../constants/filePath");

const logger = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple()
    ),

    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: filePaths.combinedLog
        }),
        new winston.transports.File({
            filename: filePaths.errorLog,
            level: "error",
        }),
    ],
});

module.exports = logger;