const getUserService = require("../../services/user/get-user.service");
const httpResponse = require("../../utils/http");
const { HTTP_STATUS_CODES } = require("../../constants/http-status-codes");
const MESSAGES = require("../../constants/messages");

const getUsers = async (req, res, next) => {
    try {
        const result = await getUserService.getUsers(req.query);

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.USER.FOUND_ALL,
            result
        );
    } catch (error) {
        next(error);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await getUserService.getUserById(
            req.params.id
        );

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.USER.FOUND,
            user
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUsers,
    getUserById,
};