const { body } = require("express-validator");

const tokenValidator = {
    access: [
        body("refreshToken")
            .notEmpty()
            .withMessage("Refresh token is required")
            .isString()
            .withMessage("Refresh token must be a string"),
    ],
};

module.exports = tokenValidator;