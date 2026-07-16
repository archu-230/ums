const express = require("express");
const router = express.Router();

const ROUTES = require("../constants/routes");
const validate = require("../middleware/validations");
const tokenValidator = require("../validators/token.validator");
const tokenController = require("../controllers/token.controller");

/**
 * @swagger
 * tags:
 *   name: Token
 *   description: Token generation APIs
 */


/**
 * @swagger
 * /token/access-token:
 *   post:
 *     summary: Generate new access token
 *     tags:
 *       - Token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1Ni...
 *     responses:
 *       200:
 *         description: Access token generated
 *       401:
 *         description: Invalid token
 */

router.post(
    ROUTES.API.TOKEN.ACCESS_TOKEN,
    tokenValidator.access,
    validate,
    tokenController.generateAccessToken
);

module.exports = router;