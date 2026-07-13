const express = require("express");
const router = express.Router();

const ROUTES = require("../constants/routes");
const validate = require("../middleware/validations");
const { signUpValidation, loginValidation } = require("../validators/auth");
const { signupApiLimiter, loginApiLimiter } = require("../config/rate-limiters");
const { signUp, login, refreshToken } = require("../controllers/auth.controllers");
router.post(
    ROUTES.API.AUTH.SIGNUP,
    signupApiLimiter,
    signUpValidation,
    validate,
    signUp
);

router.post(
    ROUTES.API.AUTH.LOGIN,
    loginApiLimiter,
    loginValidation,
    validate,
    login
);
router.post(
    ROUTES.API.AUTH.REFRESH_TOKEN,
    refreshToken
);
module.exports = router;