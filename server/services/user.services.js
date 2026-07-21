const userRepository = require("../repository/user-repository");
const { hashPassword, comparePassword, } = require("../utils/bcrypt");

const updatePassword = async (userId, newPassword) => {
    const hashedPassword = await hashPassword(newPassword);

    return await userRepository.updatePassword(
        userId,
        hashedPassword
    );
};

const signUp = async (user) => {
    user.password = await hashPassword(
        user.password
    );
    return await userRepository.create(user);
};

const findUserByEmail = async (email) => {
    return await userRepository.findByEmail(email);
};

const findUserById = async (id) => {
    return await userRepository.findById(id);
};

const checkPassword = async (password, storedPassword) => {
    return await comparePassword(
        password,
        storedPassword
    );

};
const updateRefreshToken = async (userId, refreshToken) => {
    return await userRepository.updateRefreshToken(
        userId,
        refreshToken
    );
};
module.exports = {
    signUp,
    findUserByEmail,
    findUserById,
    updateRefreshToken,
    comparePassword: checkPassword,
    updatePassword,
};