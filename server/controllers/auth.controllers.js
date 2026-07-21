const authService = require("../services/auth.service");
const httpResponse = require("../utils/http");
const { HTTP_STATUS_CODES } = require("../constants/http-status-codes");
const MESSAGES = require("../constants/messages");
const {
    setAuthCookies,
    setAccessTokenCookie,
    clearAuthCookies,
} = require("../utils/cookie");
const COOKIE_NAMES = require("../constants/cookies");
const { UnauthorizedException } = require("../lib/http-exceptions");

const signUp = async (req, res, next) => {
    try {
        const { accessToken, refreshToken, user } = await authService.signUp(req.body);

        setAuthCookies(res, { accessToken, refreshToken });

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.CREATED,
            MESSAGES.SUCCESS.USER_REGISTERED,
            { user }
        );
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { accessToken, refreshToken, user } = await authService.login(
            email,
            password
        );

        setAuthCookies(res, { accessToken, refreshToken });

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.SUCCESS.LOGIN_SUCCESS,
            { user }
        );

    } catch (error) {
        next(error);
    }
};

const refreshToken = async (req, res, next) => {
    try {
        const refreshTokenFromCookie = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];

        if (!refreshTokenFromCookie) {
            throw new UnauthorizedException(MESSAGES.AUTH.REFRESH_TOKEN_MISSING);
        }

        const { accessToken } = await authService.refreshAccessToken(
            refreshTokenFromCookie
        );

        setAccessTokenCookie(res, accessToken);

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.SUCCESS.ACCESS_TOKEN_GENERATED
        );

    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const refreshTokenFromCookie = req.cookies?.[COOKIE_NAMES.REFRESH_TOKEN];

        await authService.logout(refreshTokenFromCookie);

        clearAuthCookies(res);

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.SUCCESS.LOGOUT_SUCCESS
        );
    } catch (error) {
        next(error);
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        const user = await authService.getCurrentUser(req.user.email);

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.SUCCESS.PROFILE_FETCHED,
            { user }
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    signUp,
    login,
    refreshToken,
    logout,
    getCurrentUser,
};