const userRepository = require("../../repository/user-repository");

const userService = require("./user.service");

const updateUser = async (id, user) => {
    await userService.checkUserExists(
        id
    );

    if (user.email) {
        await userService.checkDuplicateEmail(
            user.email,
            id
        );
    }

    if (user.password) {
        user.password =
            await userService.hashUserPassword(
                user.password
            );
    }

    const updatedUser =
        await userRepository.update(
            id,
            user
        );

    return userService.sanitizeUser(
        updatedUser
    );

};

module.exports = {
    updateUser,
};