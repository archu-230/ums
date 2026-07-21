const { verifyToken, TOKEN_TYPES } = require("../utils/jwt");
const { UnauthorizedException } = require("../lib/http-exceptions");
const AUTH = require("../constants/messages/auth");
const COOKIE_NAMES = require("../constants/cookies");

const extractAccessToken = (req) => {
    const tokenFromCookie = req.cookies?.[COOKIE_NAMES.ACCESS_TOKEN];

    if (tokenFromCookie) {
        return tokenFromCookie;
    }

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer ")) {
        return authHeader.split(" ")[1];
    }

    return null;
};

const authenticate = (req, res, next) => {
    try {
        const token = extractAccessToken(req);

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