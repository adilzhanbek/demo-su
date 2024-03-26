/**
 * @module GamesRoutes
 * @description Express.js router module for game-related operations.
 * @version 1.0.0
 */

const express = require("express");

const { check } = require("express-validator");

const gamesController = require("../controller/gamesController");

const router = express.Router();

/**
 * @function GET /api/games
 * @description Retrieve a list of all games.
 * @throws {HttpError} If there is an error fetching games.
 * @returns {Object} An object containing an array of game objects.
 * @example
 * // Request
 * GET /api/games
 * // Response
 * {
 *   "games": [
 *     {
 *       "_id": "gid",
 *       "title": "Game Title",
 *       // ... other game properties
 *     },
 *     // ... other games
 *   ]
 * }
 */

router.get("/", gamesController.getGames);

/**
 * @function GET /api/games/:gid
 * @description Retrieve information about a specific game by ID.
 * @param {string} gid - The unique identifier of the game.
 * @throws {HttpError} If there is an error fetching the game or if the game with the given ID does not exist.
 * @returns {Object} An object containing information about the game.
 * @example
 * // Request
 * GET /api/games/abc123
 * // Response
 * {
 *   "_id": "gid",
 *   // ... other game properties
 * }
 */

router.get("/:gid", gamesController.getGameById);

/**
 * @function GET /api/games/user/:uid
 * @description Retrieve a list of games associated with a specific user.
 * @param {string} uid - The unique identifier of the user.
 * @throws {HttpError} If there is an error fetching games or if the user with the given ID does not exist.
 * @returns {Object} An object containing an array of game objects.
 * @example
 * // Request
 * GET /api/games/user/xyz456
 * // Response
 * {
 *   "games": [
 *     {
 *       "_id": "gid",
 *       // ... other game properties
 *     },
 *     // ... other games
 *   ]
 * }
 */

router.get("/user/:uid", gamesController.getGamesByUserId);

/**
 * @function POST /api/games
 * @description Create a new game.
 * @param {Array} players - An array of player names (max: 3).
 * @throws {HttpError} If validation fails or creating a game is unsuccessful.
 * @example
 * // Request
 * POST /api/games
 * { "players": ["Player1", "Player2", "Player3"] }
 * // Response
 * { "message": "Game created." }
 */

router.post(
  "/",
  check("players")
    .not()
    .isEmpty()
    .isArray({ max: 3 })
    .withMessage("Too many players!"),
  gamesController.createGame
);

/**
 * @function PATCH /api/games/players
 * @description Add players to an existing game.
 * @param {string} gid - The unique identifier of the game.
 * @param {Array} players - An array of player names to be added.
 * @throws {HttpError} If validation fails or adding players is unsuccessful.
 * @example
 * // Request
 * PATCH /api/games/players
 * { "gid": "abc123", "players": ["Player4", "Player5"] }
 * // Response
 * { "message": "Players added to the game." }
 */

router.patch(
  "/players",
  [check("gid").not().isEmpty(), check("players").not().isEmpty()],
  gamesController.addPlayersToGame
);

/**
 * @function DELETE /api/games/players
 * @description Delete players from an existing game.
 * @param {string} gid - The unique identifier of the game.
 * @param {Array} players - An array of player names to be removed.
 * @throws {HttpError} If validation fails or deleting players is unsuccessful.
 * @example
 * // Request
 * DELETE /api/games/players
 * { "gid": "abc123", "players": ["Player2"] }
 * // Response
 * { "message": "Players deleted from the game." }
 */

router.delete(
  "/players",
  [check("gid").not().isEmpty(), check("players").not().isEmpty()],
  gamesController.deletePlayersFromGame
);

/**
 * @function DELETE /api/games/players
 * @description Delete players from an existing game.
 * @param {string} gid - The unique identifier of the game.
 * @param {Array} players - An array of player names to be removed.
 * @throws {HttpError} If validation fails or deleting players is unsuccessful.
 * @example
 * // Request
 * DELETE /api/games/players
 * { "gid": "abc123", "players": ["Player2"] }
 * // Response
 * { "message": "Players deleted from the game." }
 */

router.delete("/:gid", gamesController.deleteGame);

module.exports = router;
