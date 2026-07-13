const userRepository = require("../repository/user-repository");

const signUp = async (user) => {
    return await userRepository.create(user);
};
const findUserByEmail = async (email) => {
    return await userRepository.findByEmail(email);
};
const findUserById = async (id) => {
    return await userRepository.findById(id);
};
const comparePassword = async (password, storedPassword) => {
    return password === storedPassword;
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
    comparePassword
};