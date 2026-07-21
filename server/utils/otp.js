const crypto = require("crypto");
const ENV = require("../constants/env");

const generateOtp = (length = ENV.OTP_LENGTH) => {
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;
    return crypto.randomInt(min, max + 1).toString();
};

module.exports = {
    generateOtp,
};