const bcrypt = require("bcryptjs");
const APPLICATION = require("../constants/application");
const hashPassword = async (password) => {
    return await bcrypt.hash(
        password,
        APPLICATION.SALT_ROUNDS
    );
};

const comparePassword = async (password, hashPassword) => {
    return await bcrypt.compare(
        password, hashPassword
    );
};

module.exports = {
    hashPassword,
    comparePassword
};