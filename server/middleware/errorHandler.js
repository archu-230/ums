const logger = require("../config/logger");
const { httpStatusCode, getReasonPhrase, } = require("../lib/httpError");

module.exports = (err, req, res, next) => {
    logger.error(
        `${req.method} ${req.originalUrl} - ${err.message}`
    );

    const statusCode = err.statusCode || httpStatusCode.errorStatus;

    res.status(statusCode).json({
        success: false,
        message: err.message || getReasonPhrase(statusCode),
    });

};


