const { HTTP_STATUS_CODES, } = require("../constants/http-status-codes");
const MESSAGES = require("../constants/messages");

const httpResponse = {
    success: (
        res,
        statusCode = HTTP_STATUS_CODES.SUCCESS,
        message = MESSAGES.SUCCESS.REQUEST_SUCCESS,
        data = {}
    ) => {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data,
            timestamp: new Date().toISOString(),
        });
    },
};

module.exports = httpResponse;