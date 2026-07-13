const { body } = require("express-validator");
const { TOKEN_TYPES } = require("../utils/jwt");

const tokenValidator = {
    access: [
        body("type")
            .equals(TOKEN_TYPES.ACCESS)
            .withMessage("Token type must be access"),

        body("email")
            .isEmail()
            .withMessage("Valid email is required"),

        body("id")
            .notEmpty()
            .withMessage("User id is required"),
    ],

    refresh: [
        body("type")
            .equals(TOKEN_TYPES.REFRESH)
            .withMessage("Token type must be refresh"),

        body("id")
            .notEmpty()
            .withMessage("User id is required"),
    ],
};
module.exports = tokenValidator;