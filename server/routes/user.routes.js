const router = require("express").Router();

const authenticate = require("../middleware/authenticate");
const validate = require("../middleware/validations");
const createUser = require("../controllers/user/create-user.controller");
const getUser = require("../controllers/user/get-user.controller");
const updateUser = require("../controllers/user/update-user.controller");
const deleteUser = require("../controllers/user/delete-user.controller");

const {
    createUserValidation,
    getUserByIdValidation,
    updateUserValidation,
    deleteUserValidation,
} = require("../validators/user.validator");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User CRUD APIs
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create new user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
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
 *         description: User created successfully
 */
router.post(
    "/",
    authenticate,
    createUserValidation,
    validate,
    createUser.createUser
);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of users per page
 *
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           enum:
 *             - name
 *             - email
 *             - createdAt
 *             - updatedAt
 *           default: createdAt
 *         description: Sort field
 *
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum:
 *             - asc
 *             - desc
 *           default: desc
 *         description: Sort order
 *
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */
router.get(
    "/",
    authenticate,
    getUser.getUsers
);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get(
    "/:id",
    authenticate,
    getUserByIdValidation,
    validate,
    getUser.getUserById
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
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
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */
router.put(
    "/:id",
    authenticate,
    updateUserValidation,
    validate,
    updateUser.updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags:
 *       - Users
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
    "/:id",
    authenticate,
    deleteUserValidation,
    validate,
    deleteUser.deleteUser
);

module.exports = router;