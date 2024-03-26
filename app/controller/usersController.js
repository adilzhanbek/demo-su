/**
 * @module UsersController
 * @description Controller module for user-related operations.
 * @version 1.0.0
 */

const HttpError = require("../models/httpError");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const logger = require("../utils/logger");
const gt = require("../utils/generateJwt");
const { validationResult } = require("express-validator");

/**
 * @function signup
 * @description Handles user registration.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {HttpError} If validation fails or user creation is unsuccessful.
 * @returns {Object} JSON response indicating successful user creation.
 * @example
 * // Request
 * POST /api/users/signup
 * { "name": "John Doe", "email": "user@example.com", "username": "john_doe", "password": "SecureP@ss123" }
 * // Response
 * { "user": { "id": "user_id", "name": "John Doe", "email": "user@example.com", "username": "john_doe", "games_participate": [], "games_created": [], "role": "user" } }
 */
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {
    logger.warn(
      "Creation failed due validation error at " +
        error.path +
        " path, location: " +
        error.location
    );
    return next(new HttpError("Invalid input, check data.", 422));
  }

  const { name, email, username, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    logger.error(err);
    return next(
      new HttpError(
        "Error occured during creation of user, please tell developers about it and tell time when it happened, ;3",
        500
      )
    );
  }

  if (existingUser) {
    logger.warn(
      "User creation failed due to using already existing user credentials"
    );
    return next(
      new HttpError(`User with such username or email already exists`, 422)
    );
  }

  const createdUser = new User({
    name,
    username,
    email,
    password: bcrypt.hashSync(password, 12),
    games_participate: [],
    games_created: [],
    role: "user",
  });

  try {
    await createdUser
      .save()
      .then(logger.info("Created new user, email: " + email));
  } catch (err) {
    logger.error(err);
    return next(
      new HttpError(
        "Error occured during fetching all users, please tell developers about it and tell time when it happened, ;3",
        500
      )
    );
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

/**
 * @function login
 * @description Handles user login.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {HttpError} If validation fails or login is unsuccessful.
 * @returns {Object} JSON response containing authentication token.
 * @example
 * // Request
 * POST /api/users/login
 * { "email": "user@example.com", "password": "securePassword" }
 * // Response
 * { "token": "jwtAuthToken" }
 */
const login = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {

    logger.warn("Login failed due to validation error at " + error.path + " path, location: " + error.location);
    return next(new HttpError("Invalid input, check data.", 422));
  }

  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    logger.error(err);
    return next(
      new HttpError(
        "Error occured during fetching all users, please tell developers about it and tell time when it happened, ;3",
        500
      )
    );
  }

  if (!existingUser || !bcrypt.compareSync(password, existingUser.password)) {
    logger.warn("Attempt of using wrong credentials");
    return next(new HttpError("Wrong credentials or user does not exist", 401));
  }
  res.json({
    accessToken: gt.generateToken(existingUser._id),
    refreshToken: gt.generateRefreshToken(existingUser._id),
  });
};

/**
 * @function getUsers
 * @description Retrieves a list of all users.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {HttpError} If fetching users is unsuccessful.
 * @returns {Object} JSON response containing an array of user objects.
 * @example
 *
 * // Request
 * GET /api/users
 * // Response
 * {
 *   "users": [
 *     { "id": "user_id", "name": "John Doe", "email": "user@example.com", "username": "john_doe", "games_participate": [], "games_created": [], "role": "user" },
 *     // ... other users
 *   ]
 * }
 */
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    logger.error(err);
    return next(
      new HttpError(
        "Error occured during fetching all users, please tell developers about it and tell time when it happened, ;3",
        500
      )
    );
  }
  logger.info("getUsers invoked");
  res
    .status(200)
    .json({ users: users.map((user) => user.toObject({ getters: true })) });
};

/**
 * @function getUserById
 * @description Retrieves user information by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {HttpError} If user ID is not found or fetching user fails.
 * @returns {Object} JSON response containing user information.
 * @example
 * // Request
 * GET /api/users/profile
 * // Response
 * { "id": "user_id", "name": "John Doe", "email": "user@example.com", "username": "john_doe", "games_participate": [], "games_created": [], "role": "user" }
 */
const getUserById = async (req, res, next) => {
  const userInfo = await User.findById(req.user._id, "-password");

  if (!userInfo) {
    logger.warn("getUserById returned 404 due non-existant user_id");
    return next(
      new HttpError(`No such user with given id of ${req.user._id}`, 404)
    );
  }
  logger.info(
    `getUserById invoked by ${req.user.id} with username of ${req.user.email}`
  );
  res.json(userInfo.toObject({ getters: true }));
};

/**
 * @function updateUser
 * @description Updates the user's password.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {HttpError} If the user ID is not found, updating the user fails, or using the same password.
 * @returns {Object} JSON response containing the updated user.
 * @example
 * // Request
 * PATCH /api/users
 * { "user_id": "user_id", "newPassword": "NewSecureP@ss456" }
 * // Response
 * { "id": "user_id", "name": "John Doe", "email": "user@example.com", "username": "john_doe", "games_participate": [], "games_created": [], "role": "user" }
 */
const updateUser = async (req, res, next) => {
  const { user_id, newPassword } = req.body;
  const userInfo = await User.findById(user_id);

  if (bcrypt.compareSync(newPassword, userInfo.password)) {
    logger.warn("User used the same password as before");
    return next(new HttpError("You cannot use the same password as before.", 400));
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(user_id, {
      password: bcrypt.hashSync(newPassword, 12),
    });
    logger.info("User " + user_id + " updated their password.");
    res.status(200).json(updatedUser.toObject({ getters: true }));
  } catch (err) {
    logger.error(err);
    return next(
      new HttpError(
        `Error occured during fetching all users, please tell developers about it and tell time when it happened, ;3`,
        500
      )
    );
  }
};

/**
 * @function deleteUser
 * @description Deletes a user by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {function} next - Express next middleware function.
 * @throws {HttpError} If the user ID is not found or deleting the user fails.
 * @returns {Object} JSON response indicating successful user deletion.
 * @example
 * // Request
 * DELETE /api/users/user_id
 * // Response
 * { "message": "User deleted" }
 */
const deleteUser = async (req, res, next) => {
  const user_id = req.params.uid;
  await User.findByIdAndDelete(user_id);
  logger.info(`User ${user_id} got deleted.`);
  res.status(200).json({ message: "User deleted" });
};

module.exports = {
  login,
  signup,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
};
