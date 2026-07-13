const authService = require("../services/auth.service");
const httpResponse = require("../utils/http");
const { HTTP_STATUS_CODES } = require("../constants/http-status-codes");
const MESSAGES = require("../constants/messages");

const signUp = async (req, res, next) => {
    try {
        const result = await authService.signUp(req.body);
        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.CREATED,
            MESSAGES.SUCCESS.USER_REGISTERED,
            result
        );

    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(
            email,
            password
        );

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.SUCCESS.LOGIN_SUCCESS,
            result
        );

    } catch (error) {
        next(error);
    }
};


const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await authService.refreshAccessToken(
            refreshToken
        );

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
    signUp,
    login,
    refreshToken,
};