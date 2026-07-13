const User = require("../models/userModel");

const create = async (user) => {
    return await User.create(user);
};
const findByEmail = async (email) => {
    return await User.findOne({ email });
};
const findById = async (id) => {
    return await User.findById(id);
}
const updateRefreshToken = async (
    userId,
    refreshToken
) => {
    return await User.findByIdAndUpdate(
        userId, {
        refreshToken,
    },
        {
            new: true,
        }
    );
}

module.exports = {
    create,
    findByEmail,
    findById,
    updateRefreshToken
};