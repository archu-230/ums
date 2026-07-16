const userRepository = require("../../repository/user-repository");
const MESSAGES = require("../../constants/messages");
const { ConflictException, NotFoundException, } = require("../../lib/http-exceptions");
const { hashPassword, } = require("../../utils/bcrypt");

const checkDuplicateEmail = async (email, userId = null) => {
    const existingUser =
        await userRepository.findByEmail(
            email
        );
    if (
        existingUser &&
        existingUser._id.toString() !== userId
    ) {
        throw new ConflictException(
            MESSAGES.USER.EMAIL_EXISTS
        );
    }

    return existingUser;
};

const checkUserExists = async (id) => {
    const user =
        await userRepository.findById(
            id
        );

    if (!user) {
        throw new NotFoundException(
            MESSAGES.USER.NOT_FOUND
        );
    }

    return user;
};

const hashUserPassword = async (password) => {
    if (!password) {
        return undefined;
    }

    return await hashPassword(
        password
    );
};

const sanitizeUser = (user) => {
    if (!user) {
        return null;
    }

    const data = user.toObject
        ? user.toObject()
        : { ...user };

    delete data.password;
    delete data.refreshToken;

    return data;
};

module.exports = {
    checkDuplicateEmail,
    checkUserExists,
    hashUserPassword,
    sanitizeUser,
};