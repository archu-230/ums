const passwordResetService = require("../services/password-reset.service");
const httpResponse = require("../utils/http");
const { HTTP_STATUS_CODES } = require("../constants/http-status-codes");
const { EMAIL_MESSAGES } = require("../constants/messages/email");

const sendOtp = async (req, res, next) => {
    try {
        const { email } = req.body;
        await passwordResetService.requestOtp(email);
        return httpResponse.success(res, HTTP_STATUS_CODES.SUCCESS, EMAIL_MESSAGES.OTP_SENT);
    } catch (error) {
        next(error);
    }
};

const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        await passwordResetService.verifyOtp(email, otp);
        return httpResponse.success(res, HTTP_STATUS_CODES.SUCCESS, EMAIL_MESSAGES.OTP_VERIFIED);
    } catch (error) {
        next(error);
    }
};

const resetWithOtp = async (req, res, next) => {
    try {
        const { email, otp, newPassword } = req.body;
        await passwordResetService.resetPasswordWithOtp(email, otp, newPassword);
        return httpResponse.success(res, HTTP_STATUS_CODES.SUCCESS, EMAIL_MESSAGES.PASSWORD_RESET_SUCCESS);
    } catch (error) {
        next(error);
    }
};

const sendResetLink = async (req, res, next) => {
    try {
        const { email } = req.body;
        await passwordResetService.requestResetLink(email);
        return httpResponse.success(res, HTTP_STATUS_CODES.SUCCESS, EMAIL_MESSAGES.RESET_LINK_SENT);
    } catch (error) {
        next(error);
    }
};

const resetWithLink = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;
        await passwordResetService.resetPasswordWithLink(token, newPassword);
        return httpResponse.success(res, HTTP_STATUS_CODES.SUCCESS, EMAIL_MESSAGES.PASSWORD_RESET_SUCCESS);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    sendOtp,
    verifyOtp,
    resetWithOtp,
    sendResetLink,
    resetWithLink,
};