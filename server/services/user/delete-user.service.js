const userRepository = require("../../repository/user-repository");
const userService = require("./user.service");

const deleteUser = async (id) => {
    await userService.checkUserExists( id );
    await userRepository.remove( id);
    return;
};

module.exports = {
    deleteUser,
};