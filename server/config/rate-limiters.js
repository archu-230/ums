const rateLimit = require("express-rate-limit");
const MESSAGES = require("../constants/messages");

const globalApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: MESSAGES.RATE_LIMIT.GLOBAL_API_LIMIT,
    },
});

const loginApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: MESSAGES.RATE_LIMIT.LOGIN_API_LIMIT,
    },
});

const signupApiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: MESSAGES.RATE_LIMIT.SIGNUP_API_LIMIT,
    },
});

module.exports = {
    globalApiLimiter,
    loginApiLimiter,
    signupApiLimiter,
};