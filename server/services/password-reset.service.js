const userService = require("./user.services");
const emailService = require("./email.service");
const { otpCache, usedResetTokenCache } = require("../config/cache");
const { generateOtp } = require("../utils/otp");
const {
    generateResetToken,
    verifyResetToken,
    RESET_TOKEN_TYPE,
} = require("../utils/resetToken");
const ENV = require("../constants/env");
const { EMAIL_MESSAGES } = require("../constants/messages/email");
const { NotFoundException, BadRequestException } = require("../lib/http-exceptions");

const requestOtp = async (email) => {
    const user = await userService.findUserByEmail(email);
    if (!user) throw new NotFoundException(EMAIL_MESSAGES.USER_NOT_FOUND);

    const otp = generateOtp();
    otpCache.set(email, { otp, verified: false });

    await emailService.sendOtpEmail({ email: user.email, name: user.name, otp });
};

const verifyOtp = async (email, otp) => {
    const cached = otpCache.get(email);
    if (!cached) throw new BadRequestException(EMAIL_MESSAGES.OTP_EXPIRED);
    if (cached.otp !== otp) throw new BadRequestException(EMAIL_MESSAGES.OTP_INVALID);

    otpCache.set(email, { ...cached, verified: true });
};

const resetPasswordWithOtp = async (email, otp, newPassword) => {
    const cached = otpCache.get(email);
    if (!cached) throw new BadRequestException(EMAIL_MESSAGES.OTP_EXPIRED);
    if (cached.otp !== otp) throw new BadRequestException(EMAIL_MESSAGES.OTP_INVALID);

    const user = await userService.findUserByEmail(email);
    if (!user) throw new NotFoundException(EMAIL_MESSAGES.USER_NOT_FOUND);

    await userService.updatePassword(user._id, newPassword);
    otpCache.del(email);
};

const requestResetLink = async (email) => {
    const user = await userService.findUserByEmail(email);
    if (!user) throw new NotFoundException(EMAIL_MESSAGES.USER_NOT_FOUND);

    const token = generateResetToken(user.email);
    const resetLink = `${ENV.RESET_PASSWORD_URL}?token=${token}`;

    await emailService.sendResetPasswordEmail({
        email: user.email,
        name: user.name,
        resetLink,
    });
};

const resetPasswordWithLink = async (token, newPassword) => {
    let decoded;

    try {
        decoded = verifyResetToken(token);
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            throw new BadRequestException(EMAIL_MESSAGES.PASSWORD_RESET_LINK_EXPIRED);
        }
        throw new BadRequestException(EMAIL_MESSAGES.PASSWORD_RESET_LINK_INVALID);
    }

    if (decoded.type !== RESET_TOKEN_TYPE) {
        throw new BadRequestException(EMAIL_MESSAGES.PASSWORD_RESET_LINK_INVALID);
    }

    if (usedResetTokenCache.get(token)) {
        throw new BadRequestException(EMAIL_MESSAGES.PASSWORD_RESET_LINK_INVALID);
    }

    const user = await userService.findUserByEmail(decoded.email);
    if (!user) throw new NotFoundException(EMAIL_MESSAGES.USER_NOT_FOUND);

    await userService.updatePassword(user._id, newPassword);
    usedResetTokenCache.set(token, true);
};

module.exports = {
    requestOtp,
    verifyOtp,
    resetPasswordWithOtp,
    requestResetLink,
    resetPasswordWithLink,
};