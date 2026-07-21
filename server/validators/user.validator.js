const { body, param } = require("express-validator");
const VALIDATION = require("../constants/messages/validation");

const createUserValidation = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage(VALIDATION.NAME_REQUIRED),

    body("email")
        .trim()
        .notEmpty()
        .withMessage(VALIDATION.EMAIL_REQUIRED)
        .isEmail()
        .withMessage(VALIDATION.EMAIL_INVALID),

    body("password")
        .notEmpty()
        .withMessage(VALIDATION.PASSWORD_REQUIRED)
        .isLength({ min: 6 })
        .withMessage(VALIDATION.PASSWORD_MIN_LENGTH),
];

const getUserByIdValidation = [
    param("id")
        .notEmpty()
        .withMessage(VALIDATION.USER_ID_REQUIRED)
        .isMongoId()
        .withMessage(VALIDATION.USER_ID_INVALID),
];

const updateUserValidation = [
    param("id")
        .notEmpty()
        .withMessage(VALIDATION.USER_ID_REQUIRED)
        .isMongoId()
        .withMessage(VALIDATION.USER_ID_INVALID),

    body("name")
        .optional()
        .trim()
        .notEmpty()
        .withMessage(VALIDATION.NAME_EMPTY),

    body("email")
        .optional()
        .trim()
        .isEmail()
        .withMessage(VALIDATION.EMAIL_INVALID),

    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage(VALIDATION.PASSWORD_MIN_LENGTH),
];

const updateBlockStatusValidation = [
    param("id")
        .notEmpty()
        .withMessage(VALIDATION.USER_ID_REQUIRED)
        .isMongoId()
        .withMessage(VALIDATION.USER_ID_INVALID),

    body("isBlocked")
        .notEmpty()
        .withMessage(VALIDATION.IS_BLOCKED_REQUIRED)
        .bail()
        .isBoolean()
        .withMessage(VALIDATION.IS_BLOCKED_INVALID)
        .toBoolean(),
];

const deleteUserValidation = [
    param("id")
        .notEmpty()
        .withMessage(VALIDATION.USER_ID_REQUIRED)
        .isMongoId()
        .withMessage(VALIDATION.USER_ID_INVALID),
];

module.exports = {
    createUserValidation,
    getUserByIdValidation,
    updateUserValidation,
    updateBlockStatusValidation,
    deleteUserValidation,
};