const User = require("../models/userModel");

const create = async (user) => {
    return await User.create(user);
};

const findAll = async (
    filter = {},
    options = {},
) => {

    const {
        skip = 0,
        limit = 10,
        sort = {},
    } = options;

    const [users, totalRecords] =
        await Promise.all([

            User.find(filter)
                .collation({ locale: "en", strength: 2 })
                .sort(sort)
                .skip(skip)
                .limit(limit),

            User.countDocuments(filter),
        ]);

    return {

        users,

        totalRecords,
    };
};
const findById = async (id) => {
    return await User.findById(id)
        .select("-password -refreshToken");
};

const findByEmail = async (email) => {
    return await User.findOne({
        email,
    });
};

const update = async (id, user) => {
    return await User.findByIdAndUpdate(
        id,
        user,
        {
            new: true,
            runValidators: true,
        }
    ).select("-password -refreshToken");
};

const remove = async (id) => {
    return await User.findByIdAndDelete(
        id
    );
};

const updateRefreshToken = async (userId, refreshToken) => {
    return await User.findByIdAndUpdate(
        userId,
        {
            refreshToken,
        },
        {
            new: true,
        }
    );
};

module.exports = {
    create,
    findByEmail,
    findById,
    findAll,
    update,
    remove,
    updateRefreshToken,
};