const transporter = require("../config/mail");
const ENV = require("../constants/env");
const { EMAIL_MESSAGES } = require("../constants/messages/email");
const logger = require("../config/logger");
const otpEmailTemplate = require("../templates/otp-email.template");
const resetPasswordEmailTemplate = require("../templates/reset-password-email.template");
const { InternalServerErrorException } = require("../lib/http-exceptions");

const sendMail = async ({ to, subject, html }) => {
    try {
        await transporter.sendMail({
            from: `"${ENV.EMAIL_FROM_NAME}" <${ENV.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
    } catch (error) {
        logger.error(`Failed to send email to ${to}: ${error.message}`);

        throw new InternalServerErrorException(
            EMAIL_MESSAGES.INTERNAL_SERVER_ERROR
        );
    }
};

const sendOtpEmail = async ({ email, name, otp }) => {
    await sendMail({
        to: email,
        subject: EMAIL_MESSAGES.OTP_SUBJECT,
        html: otpEmailTemplate({ name, otp }),
    });
};

const sendResetPasswordEmail = async ({ email, name, resetLink }) => {
    await sendMail({
        to: email,
        subject: EMAIL_MESSAGES.PASSWORD_RESET_SUBJECT,
        html: resetPasswordEmailTemplate({ name, resetLink }),
    });
};

module.exports = {
    sendOtpEmail,
    sendResetPasswordEmail,
};