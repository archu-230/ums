const httpStatusCode = require("../constants/httpStatusCode");
const { getReasonPhrase } = require("http-status-codes");

const httpError = (message, statusCode = httpStatusCode.errorStatus) => {
    const error = new Error(
        message || getReasonPhrase(statusCode)
    );

    error.statusCode = statusCode;

    return error;
};

module.exports = {
    httpError,
    httpStatusCode,
    getReasonPhrase,
};