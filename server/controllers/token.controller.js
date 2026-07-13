const tokenService = require("../services/token.service");
const httpResponse = require("../utils/http");
const { HTTP_STATUS_CODES } = require("../constants/http-status-codes");
const MESSAGES = require("../constants/messages");

const generateAccessToken = async (req, res, next) => {
    try {
        const { type, ...payload } = req.body;
        const result = tokenService.createToken(type, payload);

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.SUCCESS.ACCESS_TOKEN_GENERATED,
            result
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    generateAccessToken,
};