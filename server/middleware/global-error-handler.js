const logger = require("../config/logger");

const {
    HTTP_STATUS_CODES,
    getReasonPhrase,
} = require("../constants/http-status-codes");

const globalErrorHandler = (err, req, res, next) => {
    const statusCode =
        err.statusCode || HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR;

    logger.error(
        `${req.method} ${req.originalUrl} - ${statusCode} - ${err.message}`
    );

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message: err.message || getReasonPhrase(statusCode),
        error: {
            details: err.details || [],
        },
        timestamp: new Date().toISOString(),
    });
};

module.exports = globalErrorHandler;