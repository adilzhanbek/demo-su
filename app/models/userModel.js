/**
 * @module UserModel
 * @description Mongoose model for managing user data.
 * @version 1.0.0
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;
/**
 * @typedef {Object} User
 * @property {string} name - The user's name.
 * @property {string} username - The user's unique username.
 * @property {string} email - The user's unique email address.
 * @property {string} password - The user's password.
 * @property {Array} games_participate - An array of game IDs the user is participating in.
 * @property {Array} games_created - An array of game IDs created by the user.
 * @property {string} role - The user's role (default: "user").
 */

/**
 * @type {mongoose.Schema}
 * @description Defines the schema for the User model.
 */
const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 8 },
    games_participate: { type: Array, required: false, default: [] },
    games_created: { type: Array, required: false, default: [] },
    role: { type: String, required: false, default: "user" },
});

/**
 * @description Adds unique validation to certain fields in the schema.
 */
userSchema.plugin(uniqueValidator);

/**
 * @type {mongoose.Model<User>}
 * @description Creates the User model using the defined schema.
 */
module.exports = mongoose.model('User', userSchema);