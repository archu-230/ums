const { generateToken } = require("../utils/jwt");

const createToken = (type, payload) => {
    return { token: generateToken(type, payload) };
};

module.exports = {
    createToken,
};