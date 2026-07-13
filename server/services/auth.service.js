const userService = require("./user.services");
const MESSAGES = require("../constants/messages");
const { generateToken, verifyToken, TOKEN_TYPES, } = require("../utils/jwt");
const { ConflictException, NotFoundException, UnauthorizedException, } = require("../lib/http-exceptions");

const createTokens = (user) => {
    return {
        accessToken: generateToken(
            TOKEN_TYPES.ACCESS,
            {
                id: user._id,
                email: user.email,
            }
        ),

        refreshToken: generateToken(
            TOKEN_TYPES.REFRESH,
            {
                id: user._id,
            }
        ),
    };
};

const signUp = async (user) => {
    const existingUser =
        await userService.findUserByEmail(
            user.email
        );

    if (existingUser) {
        throw new ConflictException(
            MESSAGES.AUTH.EMAIL_ALREADY_REGISTERED
        );
    }

    const createdUser = await userService.signUp(user);

    const {
        accessToken,
        refreshToken,
    } = createTokens(createdUser);

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

const login = async (
    email,
    password
) => {
    const user =
        await userService.findUserByEmail(
            email
        );

    if (!user) {
        throw new NotFoundException(
            MESSAGES.AUTH.USER_NOT_FOUND
        );
    }

    const isPasswordValid =
        await userService.comparePassword(
            password,
            user.password
        );

    if (!isPasswordValid) {
        throw new UnauthorizedException(
            MESSAGES.AUTH.INVALID_CREDENTIALS
        );
    }

    const {
        accessToken,
        refreshToken,
    } = createTokens(user);

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

const refreshAccessToken = async (
    refreshToken
) => {
    const decoded = verifyToken(
        TOKEN_TYPES.REFRESH,
        refreshToken
    );

    const user =
        await userService.findUserById(
            decoded.id
        );

    if (!user) {
        throw new UnauthorizedException(
            MESSAGES.AUTH.INVALID_CREDENTIALS
        );
    }

    if (
        user.refreshToken !==
        refreshToken
    ) {
        throw new UnauthorizedException(
            MESSAGES.AUTH.INVALID_REFRESH_TOKEN
        );
    }

    const accessToken =
        generateToken(
            TOKEN_TYPES.ACCESS,
            {
                id: user._id,
                email: user.email,
            }
        );

    return {
        accessToken,
    };
};

module.exports = {
    signUp,
    login,
    refreshAccessToken,
};