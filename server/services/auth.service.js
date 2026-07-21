const userService = require("./user.services");
const AUTH = require("../constants/messages/auth");
const { generateToken, verifyToken, TOKEN_TYPES, } = require("../utils/jwt");
const {
    ConflictException,
    NotFoundException,
    UnauthorizedException,
    ForbiddenException,
} = require("../lib/http-exceptions");

const buildTokenPayload = (user) => ({
    email: user.email,
    password: user.password,
});

const createAccessToken = (user) =>
    generateToken(TOKEN_TYPES.ACCESS, buildTokenPayload(user));

const createRefreshToken = (user) =>
    generateToken(TOKEN_TYPES.REFRESH, buildTokenPayload(user));

const createTokens = (user) => ({
    accessToken: createAccessToken(user),
    refreshToken: createRefreshToken(user),
});

const signUp = async (user) => {
    const existingUser =
        await userService.findUserByEmail(
            user.email
        );

    if (existingUser) {
        throw new ConflictException(
            AUTH.EMAIL_ALREADY_REGISTERED
        );
    }

    const createdUser = await userService.signUp(user);
    const { accessToken, refreshToken, } = createTokens(createdUser);

    await userService.updateRefreshToken(
        createdUser._id,
        refreshToken
    );

    return {
        user: {
            id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
        },
        accessToken,
        refreshToken,
    };
};

const login = async (email, password) => {
    const user =
        await userService.findUserByEmail(
            email
        );

    if (!user) {
        throw new NotFoundException(
            AUTH.USER_NOT_FOUND
        );
    }

    if (user.isBlocked) {
        throw new ForbiddenException(
            AUTH.ACCOUNT_BLOCKED
        );
    }

    const isPasswordValid = await userService.comparePassword(
        password,
        user.password
    );

    if (!isPasswordValid) {
        throw new UnauthorizedException(
            AUTH.INVALID_CREDENTIALS
        );
    }

    const { accessToken, refreshToken, } = createTokens(user);

    await userService.updateRefreshToken(
        user._id,
        refreshToken
    );

    return {
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
        accessToken,
        refreshToken,
    };
};

const refreshAccessToken = async (refreshToken) => {
    const decoded = verifyToken(
        TOKEN_TYPES.REFRESH,
        refreshToken
    );

    const user =
        await userService.findUserByEmail(
            decoded.email
        );

    if (!user) {
        throw new UnauthorizedException(
            AUTH.INVALID_CREDENTIALS
        );
    }

    if (
        user.refreshToken !== refreshToken
    ) {
        throw new UnauthorizedException(
            AUTH.INVALID_REFRESH_TOKEN
        );
    }

    if (user.isBlocked) {
        throw new ForbiddenException(
            AUTH.ACCOUNT_BLOCKED
        );
    }

    const accessToken = createAccessToken(user);

    return {
        accessToken,
    };
};

const logout = async (refreshToken) => {
    if (!refreshToken) {
        return;
    }

    const user =
        await userService.findUserByRefreshToken(
            refreshToken
        );

    if (user) {
        await userService.updateRefreshToken(user._id, null);
    }
};

const getCurrentUser = async (email) => {
    const user =
        await userService.findUserByEmail(email);

    if (!user) {
        throw new UnauthorizedException(
            AUTH.USER_NOT_FOUND
        );
    }

    return {
        id: user._id,
        name: user.name,
        email: user.email,
        isBlocked: user.isBlocked,
    };
};

module.exports = {
    signUp,
    login,
    refreshAccessToken,
    logout,
    getCurrentUser,
};