const { verifyToken, TOKEN_TYPES } = require("../utils/jwt");
const { UnauthorizedException, } = require("../lib/http-exceptions");
const MESSAGES = require("../constants/messages");

const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new UnauthorizedException(MESSAGES.AUTH.UNAUTHORIZED);
        }

        const token = authHeader.split(" ")[1];
        const decoded = verifyToken(TOKEN_TYPES.ACCESS, token);

        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
};
module.exports = authenticate;