const userRepository = require("../../repository/user-repository");
const userService = require("./user.service");
const { buildPagination, } = require("../../utils/pagination");

const getUsers = async (query) => {

    const options = buildPagination(query);

    const result =
        await userRepository.findAll(
            {},
            options
        );

    return {

        users: result.users.map(user =>
            userService.sanitizeUser(user)
        ),

        pagination: {

            page: options.page,
            limit: options.limit,
            totalRecords: result.totalRecords,
            totalPages: Math.ceil(
                result.totalRecords /
                options.limit
            ),

            hasNextPage:
                options.page <
                Math.ceil(
                    result.totalRecords /
                    options.limit
                ),

            hasPreviousPage:
                options.page > 1,
        },
    };
};

const getUserById = async (id) => {

    const user =
        await userService.checkUserExists(id);

    return userService.sanitizeUser(user);
};

module.exports = {
    getUsers,
    getUserById,
};