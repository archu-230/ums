const express = require("express");
const router = express.Router();

const ROUTES = require("../constants/routes");
const validate = require("../middleware/validations");
const { forgotPasswordApiLimiter } = require("../config/rate-limiters");

const {
    sendOtp,
    verifyOtp,
    resetWithOtp,
    sendResetLink,
    resetWithLink,
} = require("../controllers/password-reset.controller");

const {
    sendOtpValidation,
    verifyOtpValidation,
    resetWithOtpValidation,
    sendResetLinkValidation,
    resetWithLinkValidation,
} = require("../validators/password-reset");

router.post(ROUTES.API.PASSWORD.SEND_OTP, forgotPasswordApiLimiter, sendOtpValidation, validate, sendOtp);
router.post(ROUTES.API.PASSWORD.VERIFY_OTP, forgotPasswordApiLimiter, verifyOtpValidation, validate, verifyOtp);
router.post(ROUTES.API.PASSWORD.RESET_WITH_OTP, forgotPasswordApiLimiter, resetWithOtpValidation, validate, resetWithOtp);
router.post(ROUTES.API.PASSWORD.SEND_RESET_LINK, forgotPasswordApiLimiter, sendResetLinkValidation, validate, sendResetLink);
router.post(ROUTES.API.PASSWORD.RESET_WITH_LINK, forgotPasswordApiLimiter, resetWithLinkValidation, validate, resetWithLink);

module.exports = router;