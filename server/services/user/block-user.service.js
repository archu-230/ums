const userRepository = require("../../repository/user-repository");
const userService = require("./user.service");

const updateBlockStatus = async (id, isBlocked) => {
    await userService.checkUserExists(id);

    const updatedUser =
        await userRepository.updateBlockStatus(
            id,
            isBlocked
        );

    return userService.sanitizeUser(updatedUser);
};

module.exports = {
    updateBlockStatus,
};