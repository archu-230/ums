const express = require("express");
const router = express.Router();

const authRoutes = require("./auth.routes");
const tokenRoutes = require("./token.routes");
const ROUTES = require("../constants/routes");

router.use(ROUTES.API.AUTH.BASE_PATH, authRoutes);
router.use(ROUTES.API.TOKEN.BASE_PATH, tokenRoutes);

module.exports = router;