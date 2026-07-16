const deleteUserService = require("../../services/user/delete-user.service");
const httpResponse = require("../../utils/http");
const { HTTP_STATUS_CODES } = require("../../constants/http-status-codes");
const MESSAGES = require("../../constants/messages");

const deleteUser = async (req, res, next) => {
    try {
        await deleteUserService.deleteUser(req.params.id);

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            MESSAGES.USER.DELETED
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    deleteUser,
};