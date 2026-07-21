const blockUserService = require("../../services/user/block-user.service");
const httpResponse = require("../../utils/http");
const { HTTP_STATUS_CODES } = require("../../constants/http-status-codes");
const MESSAGES = require("../../constants/messages");

const updateBlockStatus = async (req, res, next) => {
    try {
        const { isBlocked } = req.body;

        const user = await blockUserService.updateBlockStatus(
            req.params.id,
            isBlocked
        );

        return httpResponse.success(
            res,
            HTTP_STATUS_CODES.SUCCESS,
            isBlocked ? MESSAGES.USER.BLOCKED : MESSAGES.USER.UNBLOCKED,
            user
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    updateBlockStatus,
};