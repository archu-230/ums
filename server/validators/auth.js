const rules = require("./schema");

const signUpValidation = [
    rules.name(),
    rules.email(),
    rules.password(),
];

const loginValidation = [
    rules.email(),
    rules.password(),
];

module.exports = {
    signUpValidation,
    loginValidation,
};