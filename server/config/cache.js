const NodeCache = require("node-cache");
const ENV = require("../constants/env");

const otpCache = new NodeCache({
    stdTTL: ENV.OTP_EXPIRY_MINUTES * 60,
    checkperiod: 60,
    useClones: false,
});

const usedResetTokenCache = new NodeCache({
    stdTTL: ENV.RESET_PASSWORD_EXPIRY_MINUTES * 60,
    checkperiod: 60,
    useClones: false,
});

module.exports = {
    otpCache,
    usedResetTokenCache,
};