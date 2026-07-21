const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { signUp, login, refreshToken, logout, getCurrentUser } = require("../controllers/auth.controllers");
const ROUTES = require("../constants/routes");
const validate = require("../middleware/validations");
const { signUpValidation, loginValidation } = require("../validators/auth");
const { signupApiLimiter, loginApiLimiter } = require("../config/rate-limiters");


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication APIs
 */


/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Archana
 *               email:
 *                 type: string
 *                 example: archana@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: User created successfully
 *
 *       400:
 *         description: Validation error
 *
 *       409:
 *         description: Email already exists
 */
router.post(
    ROUTES.API.AUTH.SIGNUP,
    signupApiLimiter,
    signUpValidation,
    validate,
    signUp
);



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and generate access token and refresh token
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: archana@gmail.com
 *               password:
 *                 type: string
 *                 example: Password@123
 *
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 accessToken: jwt_access_token
 *                 refreshToken: jwt_refresh_token
 *
 *       401:
 *         description: Invalid email or password
 */
router.post(
    ROUTES.API.AUTH.LOGIN,
    loginApiLimiter,
    loginValidation,
    validate,
    login
);



/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Generate new access token
 *     description: Generate a new access token using refresh token
 *     tags:
 *       - Authentication
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR...
 *
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *
 *       401:
 *         description: Invalid or expired refresh token
 */
router.post(
    ROUTES.API.TOKEN.REFRESH_TOKEN,
    refreshToken
);


/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     description: Clears auth cookies and revokes the refresh token
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.post(
    ROUTES.API.AUTH.LOGOUT,
    logout
);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current logged-in user
 *     tags:
 *       - Authentication
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current user
 *       401:
 *         description: Not authenticated
 */
router.get(
    ROUTES.API.AUTH.ME,
    authenticate,
    getCurrentUser
);
module.exports = router;