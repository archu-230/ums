const { StatusCodes } = require("http-status-codes");

module.exports = {
    ...StatusCodes,
    errorStatus: StatusCodes.INTERNAL_SERVER_ERROR,
};