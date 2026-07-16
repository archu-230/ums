const updateUserService = require("../../services/user/update-user.service");
const httpResponse = require("../../utils/http");
const { HTTP_STATUS_CODES } = require("../../constants/http-status-codes");
const MESSAGES = require("../../constants/messages");

const updateUser = async (req, res, next) => {
    try {
        const user = await updateUserService.updateUser(
            req.params.id,
            req.body
        );

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.USER.UPDATED,
            user
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateUser,
};