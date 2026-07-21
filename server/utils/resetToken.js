const jwt = require("jsonwebtoken");
const ENV = require("../constants/env");

const RESET_TOKEN_TYPE = "password-reset";

const generateResetToken = (email) => {
    return jwt.sign(
        { email, type: RESET_TOKEN_TYPE },
        ENV.JWT_RESET_PASSWORD_SECRET,
        { expiresIn: `${ENV.RESET_PASSWORD_EXPIRY_MINUTES}m` }
    );
};

const verifyResetToken = (token) => {
    return jwt.verify(token, ENV.JWT_RESET_PASSWORD_SECRET);
};

module.exports = {
    generateResetToken,
    verifyResetToken,
    RESET_TOKEN_TYPE,
};