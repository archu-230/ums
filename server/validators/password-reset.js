const rules = require("./schema");

const sendOtpValidation = [
    rules.email(),
];

const verifyOtpValidation = [
    rules.email(),
    rules.otp(),
];

const resetWithOtpValidation = [
    rules.email(),
    rules.otp(),
    rules.newPassword(),
];

const sendResetLinkValidation = [
    rules.email(),
];

const resetWithLinkValidation = [
    rules.token(),
    rules.newPassword(),
];

module.exports = {
    sendOtpValidation,
    verifyOtpValidation,
    resetWithOtpValidation,
    sendResetLinkValidation,
    resetWithLinkValidation,
};