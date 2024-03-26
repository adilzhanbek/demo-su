/**
 * @module GameModel
 * @description Mongoose model for managing game-related data.
 */

const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

/**
 * @typedef {Object} Game
 * @property {Array} players - An array of player names.
 * @property {string} type - The type of the game.
 * @property {string} creator_id - The unique identifier of the game creator.
 * @property {Date} created_at - The date and time when the game was created.
 * @property {Date} updated_at - The date and time when the game was last updated.
 */

/**
 * @type {Schema}
 * @description Mongoose schema for the Game model.
 */
const gameSchema = new Schema({
  players: { type: Array, required: true },
  type: { type: String, required: true },
  creator_id: { type: String, required: true },
  created_at: { type: Date, required: false },
  updated_at: { type: Date, required: false },
});

// Apply the uniqueValidator plugin to enforce uniqueness constraints.
gameSchema.plugin(uniqueValidator);

/**
 * @function
 * @description Middleware to set the creation date when saving a new game.
 * @param {Function} next - The next middleware function.
 */
gameSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = new Date();
  }
  next();
});

/**
 * @type {Model<Game>}
 * @description Mongoose model for the Game schema.
 */
const Game = mongoose.model('Game', gameSchema);

module.exports = Game;