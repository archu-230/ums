const express = require("express");
const router = express.Router();

const ROUTES = require("../constants/routes");
const validate = require("../middleware/validations");
const tokenValidator = require("../validators/token.validator");
const tokenController = require("../controllers/token.controller");

router.post(
    ROUTES.API.TOKEN.ACCESS_TOKEN,
    tokenValidator.access,
    validate,
    tokenController.generateAccessToken
);

module.exports = router;