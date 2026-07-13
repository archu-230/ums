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

module.exports = {
    name,
    email,
    password,
};