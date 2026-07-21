const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const tokenRoutes = require("./token.routes");
const ROUTES = require("../constants/routes");
const userRoutes = require("./user.routes");
const passwordResetRoutes = require("./password-reset.routes");

router.use(ROUTES.API.AUTH.BASE_PATH, authRoutes);
router.use(ROUTES.API.TOKEN.BASE_PATH, tokenRoutes);
router.use(ROUTES.API.USER.BASE_PATH, userRoutes);
router.use(ROUTES.API.PASSWORD.BASE_PATH, passwordResetRoutes);
module.exports = router;