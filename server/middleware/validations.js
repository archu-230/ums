const { validationResult } = require("express-validator");
const { BadRequestException } = require("../lib/http-exceptions");

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(
            new BadRequestException(
                "Validation failed",
                errors.array()
            )
        );
    }

    next();
};

module.exports = validate;