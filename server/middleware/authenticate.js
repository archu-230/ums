const { verifyToken, TOKEN_TYPES } = require("../utils/jwt");
const { UnauthorizedException } = require("../lib/http-exceptions");
const AUTH = require("../constants/messages/auth");

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException(
                AUTH.AUTHORIZATION_TOKEN_REQUIRED
            );
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            throw new UnauthorizedException(
                AUTH.ACCESS_TOKEN_MISSING
            );
        }

        const decoded = verifyToken(
            TOKEN_TYPES.ACCESS,
            token
        );
        req.user = decoded;

        next();
    } catch (error) {
        next(
            new UnauthorizedException(
                AUTH.INVALID_ACCESS_TOKEN
            )
        );
    }
};

module.exports = authenticate;