const userRepository = require("../../repository/user-repository");
const userService = require("./user.service");

const createUser = async (user) => {
    await userService.checkDuplicateEmail(
        user.email
    );

    user.password =
        await userService.hashUserPassword(
            user.password
        );

    const createdUser =
        await userRepository.create(
            user
        );

    return userService.sanitizeUser(
        createdUser
    );

};

module.exports = {
    createUser,
};