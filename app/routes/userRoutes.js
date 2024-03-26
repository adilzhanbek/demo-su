/**
 * @module UsersRoutes
 * @description Express.js router module for user-related operations.
 * @version 1.0.0
 */

const express = require("express");
const passport = require("passport");
require("../utils/passport-config")(passport);
const usersController = require("../controller/usersController");
const { check } = require("express-validator");

const router = express.Router();

/**
 * @function POST /api/users/login
 * @description Authenticate a user by email and password.
 * @param {string} email - The user's email address.
 * @throws {ValidationError} If email is not valid.
 * @returns {Object} Authentication response.
 * @example
 * // Request
 * POST /api/users/login
 * { "email": "user@example.com", "password": "securePassword" }
 * // Response
 * { "token": "jwtAuthToken" }
 */
router.post(
  "/login",
  check("email").normalizeEmail().isEmail().withMessage("Email is not valid."),
  usersController.login
);

/**
 * @function POST /api/users/signup
 * @description Register a new user.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @throws {ValidationError} If input validation fails.
 * @returns {Object} Registration response.
 * @example
 * // Request
 * POST /api/users/signup
 * { "name": "John Doe", "email": "user@example.com", "username": "john_doe", "password": "SecureP@ss123" }
 * // Response
 * { "name": "John Doe", "email": "user@example.com", "username": "john_doe", ... }
 */
router.post(
  "/signup",
  [
    check("name")
      .notEmpty()
      .withMessage("Name is not valid.")
      .matches("[ЁёА-яA-z]"),
    check("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Email is not valid or email service is not available."),
    check("username")
      .isLength({ min: 2, max: 32 })
      .withMessage(
        "Username must be at least 2 characters long and at most 32."
      ),
    check("password")
      .matches("^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{8,16}$")
      .withMessage(
        "password does not meet requirements.\nPassword must contain at least 8 symbols and at least 1 numeral."
      ),
  ],
  usersController.signup
);

/**
 * @function GET /api/users
 * @description Retrieve a list of all users.
 * @throws {AuthorizationError} If the user is not authenticated.
 * @returns {Array} An array of user objects.
 * @example
 * // Request
 * GET /api/users
 * // Response
 * [
 *   { "id": "user_id", "name": "John Doe", "email": "user@example.com" },
 *   // ... other users
 * ]
 */
router.get("/", usersController.getUsers);

/**
 * @function GET /api/users/profile
 * @description Retrieve the profile of the authenticated user.
 * @throws {AuthorizationError} If the user is not authenticated.
 * @returns {Object} The user's profile information.
 * @example
 * // Request
 * GET /api/users/profile
 * // Response
 * { "id": "user_id", "name": "John Doe", "email": "user@example.com" }
 */
router.get("/profile", [
  passport.authenticate("jwt", { session: false }),
  usersController.getUserById,
]);

/**
 * @function PATCH /api/users
 * @description Update the profile of the authenticated user.
 * @throws {AuthorizationError} If the user is not authenticated.
 * @returns {Object} The updated user profile.
 * @example
 * // Request
 * PATCH /api/users
 * { "name": "Updated Name", "email": "updated@example.com" }
 * // Response
 * { "message": "User profile updated successfully." }
 */
router.patch("/", usersController.updateUser);

/**
 * @function DELETE /api/users/:uid
 * @description Delete a user by ID.
 * @param {string} uid - The unique identifier of the user to be deleted.
 * @throws {AuthorizationError} If the user is not authenticated.
 * @returns {Object} Deletion response.
 * @example
 * // Request
 * DELETE /api/users/user_id
 * // Response
 * { "message": "User deleted successfully." }
 */
router.delete("/:uid", usersController.deleteUser);

module.exports = router;
