const { body } = require("express-validator");

const name = () =>
    body("name")
        .trim()
        .notEmpty()
        .withMessage("Name is required");

const email = () =>
    body("email")
        .trim()
        .notEmpty()
        .withMessage("Email is required")
        .bail()
        .isEmail()
        .withMessage("Invalid email format");

const password = () =>
    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .bail()
        .isLength({ min: 6 })
        .withMessage("Password must be at least 6 characters");

const otp = () =>
    body("otp")
        .trim()
        .notEmpty()
        .withMessage("OTP is required")
        .bail()
        .isNumeric()
        .withMessage("OTP must contain digits only")
        .bail()
        .isLength({ min: 4, max: 8 })
        .withMessage("Invalid OTP");

const newPassword = () =>
    body("newPassword")
        .notEmpty()
        .withMessage("New password is required")
        .bail()
        .isLength({ min: 6 })
        .withMessage("New password must be at least 6 characters");

const token = () =>
    body("token")
        .trim()
        .notEmpty()
        .withMessage("Reset token is required");

module.exports = {
    name,
    email,
    password,
    otp,
    newPassword,
    token,
};