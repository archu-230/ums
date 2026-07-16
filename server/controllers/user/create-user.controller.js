const createUserService = require("../../services/user/create-user.service");
const httpResponse = require("../../utils/http");
const { HTTP_STATUS_CODES, } = require("../../constants/http-status-codes");
const MESSAGES = require("../../constants/messages");

const createUser = async (req, res, next) => {
    try {
        const user =
            await createUserService.createUser(
                req.body
            );

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.CREATED,
            MESSAGES.USER.CREATED,
            user
        );

    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
};