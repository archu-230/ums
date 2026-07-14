const jwt = require("jsonwebtoken");
const ENV = require("../constants/env");


const TOKEN_TYPES = { ACCESS: "access", REFRESH: "refresh", };

const generateToken = (type, payload) => {
    const secret = type === TOKEN_TYPES.ACCESS ? ENV.JWT_ACCESS_SECRET : ENV.JWT_REFRESH_SECRET;
    const expiresIn = type === TOKEN_TYPES.ACCESS ? ENV.ACCESS_TOKEN_EXPIRY : ENV.REFRESH_TOKEN_EXPIRY;

    return jwt.sign(
        {
            ...payload,
            type
        },
        secret,
        {
            expiresIn,
        }
    );
};

const verifyToken = (type, token) => {
    const secret = type === TOKEN_TYPES.ACCESS ? ENV.JWT_ACCESS_SECRET : ENV.JWT_REFRESH_SECRET;

    return jwt.verify(
        token, secret
    );
};

module.exports = {
    generateToken,
    verifyToken,
    TOKEN_TYPES,
};