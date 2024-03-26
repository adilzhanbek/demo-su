/**
 * @module GameRoutes
 * @description Express.js controller module for handling game-related operations.
 * @version 0.1.0
 */

const HttpError = require("../models/httpError");
const { validationResult } = require("express-validator");
const Game = require("../models/gameModel");
const User = require("../models/userModel");
const logger = require("../utils/logger");

/**
 * @function
 * @name getGames
 * @async
 * @memberof gamesController
 * @description Controller function for handling the retrieval of all games.
 * @param {object} req - Express.js request object.
 * @param {object} res - Express.js response object.
 * @param {function} next - Express.js next middleware function.
 * @returns {Object} An array of game objects.
 */

const getGames = async (req, res, next) => {
  let games;
  try {
    games = await Game.find({});
  } catch (err) {
    logger.error(`at route getGames ${err}`);
    return next(
      new HttpError(
        "Error occured during fetching all games, please tell developers about it and tell time when it happened, ;3",
        500
      )
    );
  }
  logger.info("getGames invoked");
  res
    .status(200)
    .json({ games: games.map((game) => game.toObject({ getters: true })) });
};

/**
 * @function GET /api/games/:gid
 * @description Retrieve players of a game by game ID.
 * @param {string} req.params.gid - The unique identifier of the game.
 * @throws {HttpError} If validation fails or there is an error fetching the game.
 * @returns {Object} An array of player objects in the game.
 * @example
 * // Request
 * GET /api/games/123456789
 * // Response
 * [
 *    "username1", "username2",
 *      "username2",
 *   // ... other players
 * ]
 */

const getGameById = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {
    logger.warn(
      `Creation failed due validation error at
        ${error.path}
        path, location:
        ${error.location}`
    );
    return next(new HttpError("Invalid input, check data.", 422));
  }

  const gameId = req.params.gid;

  try {
    const game = await Game.findById(gameId);

    if (!game) {
      return res.status(404).json({ message: "Game is not found" });
    }

    const players = await game.players;

    res.status(200).json(players);
  } catch (err) {
    logger.error("Error getting game by id:", err);
    return new HttpError("Error occured during getting game by id ", 500);
  }
};

/**
 * @function GET /api/games/user/:uid
 * @description Retrieve games created by a user by user ID.
 * @param {string} req.params.uid - The unique identifier of the user.
 * @throws {HttpError} If validation fails or there is an error fetching the games.
 * @returns {Object} An array of game objects created by the user.
 * @example
 * // Request
 * GET /api/games/user/987654321
 * // Response
 * [ "5430gfd0bd00d8fd8s08", "9fds89g8ds9s7fd8s8f7sd8",
 *    ":gid1", ":gid2", ... //
 *   // ... other games
 * ]
 */

const getGamesByUserId = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {
    logger.warn(
      `Creation failed due validation error at
        ${error.path}
        path, location:
        ${error.location}`
    );
    return next(new HttpError("Invalid input, check data.", 422));
  }

  const userId = req.params.uid;

  try {
    const creator = await User.findById(userId);

    if (!creator) {
      return res.status(404).json({ message: "User is not found" });
    }

    const createdGames = await creator.games_created;

    res.status(200).json(createdGames);
  } catch (err) {
    logger.error("Error getting games", err);
    return new HttpError("Error during getting games by user's id", 500);
  }
};

/**
 * @function POST /api/games
 * @description Create a new game.
 * @param {Object} req.body - Request body containing game details.
 * @param {string[]} req.body.players - An array of usernames representing the players participating in the game.
 * @param {string} req.body.type - The type or category of the game.
 * @param {string} req.body.creator_id - The unique identifier of the user creating the game.
 * @param {Date} req.body.created_at - The date and time when the game is created.
 * @param {Date} req.body.updated_at - The date and time when the game is updated.
 * @throws {HttpError} If validation fails, the creator user is not found, or there is an error during game creation.
 * @returns {Object} An object containing the details of the created game.
 * @example
 * // Request
 * POST /api/games
 * {
 *   "players": ["player1", "player2", "player3"],
 *   "type": "Chess",
 *   "creator_id": "user_id",
 *   "created_at": "2023-01-01T12:00:00Z", (not required)
 *   "updated_at": "2023-01-01T12:00:00Z" (not required)
 * }
 * // Response
 * {
 *   "_id": "gid",
 *   "players": ["player1", "player2", "player3"],
 *   "type": "Chess",
 *   "creator_id": "user_id",
 *   "created_at": "2023-01-01T12:00:00Z",
 *   "updated_at": "2023-01-01T12:00:00Z"
 * }
 */

const createGame = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {
    logger.warn(
      `Creation failed due validation error at
        ${error.path}
          path, location:
            ${error.location}`
    );
    return next(new HttpError("Invalid input, check data.", 422));
  }

  const { players, type, creator_id, created_at, updated_at } = req.body;

  try {
    const creatorUser = await User.findById(creator_id);

    if (!creatorUser) {
      logger.warn(
        `Someone tried adding non-existant user
          ${error.path}
          path, location:
          ${error.location}`
      );
      return next(new HttpError(`User with id ${creator_id} not found`, 404));
    }

    const createdGame = new Game({
      players: players,
      type: type,
      creator_id: creatorUser._id,
      created_at: created_at,
      updated_at: updated_at,
    });

    await createdGame
      .save()
      .then(
        logger.info(
          `Game with id of ${createdGame._id} has been created by user ${creatorUser.email}`
        )
      );

    for (const player_username of players) {
      const playerUser = await User.findOne({ username: player_username });
      if (playerUser) {
        playerUser.games_participate.push(createdGame._id);
        await playerUser
          .save()
          .then(
            logger.info(
              `User with id of ${playerUser._id} has been added to game with id of ${createdGame._id}`
            )
          );
      }
    }

    const game = await Game.findById(createdGame._id);
    if (!game) {
      return next(
        new HttpError(`Game with id ${createdGame._id} not found`, 404)
      );
    }

    creatorUser.games_created.push(createdGame._id);
    await creatorUser
      .save()
      .then(
        logger.info(
          `Creator of game with id of ${createdGame._id} is ${creator_id}`
        )
      );

    game.updated_at = new Date();
    await game.save();

    logger.info(`Game has been created with id of ${createdGame._id}`);
    res.status(201).json(createdGame);
  } catch (err) {
    logger.error("Error creating game:", err);
    return new HttpError(
      "Error occured during game creation, please tell developers about it and tell time when it happened, ;3",
      500
    );
  }
};

/**
 * @function POST /api/games/players
 * @description Add players to an existing game.
 * @param {Object} req.body - Request body containing game and player details.
 * @param {string} req.body.gid - The unique identifier of the game to which players will be added.
 * @param {string[]} req.body.players - An array of usernames representing the players to be added to the game.
 * @throws {HttpError} If validation fails, the game is not found, a user is not found, a user is already participating in the game, or there is an error during the process.
 * @returns {Object} A success message indicating that the game has been successfully updated.
 * @example
 * // Request
 * POST /api/games/players
 * {
 *   "gid": "gid",
 *   "players": ["player1", "player2"]
 * }
 * // Response
 * {
 *   "Message": "Game has been successfully updated"
 * }
 */

const addPlayersToGame = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {
    logger.warn(
      `Adding user to game failed due validation error at
        ${error.path}
        path, location:
        ${error.location}`
    );
    return next(new HttpError("Invalid input, check data.", 422));
  }

  const { gid, players } = req.body;

  try {
    const game = await Game.findById(gid);

    if (!game) {
      return next(new HttpError(`Game with id ${gid} not found`, 404));
    }

    for (const player_username of players) {
      const playerUser = await User.findOne({ username: player_username });

      if (!playerUser) {
        return next(
          new HttpError(`User with username ${player_username} not found`, 404)
        );
      }

      if (game.players.includes(player_username)) {
        logger.warn(
          "User addition failed due person already participating in game"
        );
        return next(
          new HttpError(`User ${player_username} is already in the game`, 422)
        );
      }
      logger.info(player_username + " has been added to game " + gid);
      game.players.push(player_username);
      await game.save().then(logger.info(gid + " has been save successfully."));

      playerUser.games_participate.push(game._id);
      await playerUser
        .save()
        .then(logger.info(playerUser + "User has been added to game" + gid));
    }

    game.updated_at = new Date();
    await game
      .save()
      .then(logger.info(`Game has been updated at ${game.updated_at}`));

    res.status(200).json({ Message: "Game has been successfully updated" });
  } catch (err) {
    logger.error("Error adding players to the game:", err);
    return next(
      new HttpError(
        "Error occured during adding players to game, please tell developers about it and tell time when it happened, ;3",
        500
      )
    );
  }
};

/**
 * @function DELETE /api/games/players
 * @description Delete players from an existing game.
 * @param {Object} req.body - Request body containing game and player details.
 * @param {string} req.body.gid - The unique identifier of the game from which players will be deleted.
 * @param {string[]} req.body.players - An array of usernames representing the players to be deleted from the game.
 * @throws {HttpError} If validation fails, the game is not found, a user is not found, a user is not in the game, or there is an error during the process.
 * @returns {Object} A success message indicating that the game has been successfully updated.
 * @example
 * // Request
 * DELETE /api/games/players
 * {
 *   "gid": "gid",
 *   "players": ["player1", "player2"]
 * }
 * // Response
 * {
 *   "message": "Game has been successfully updated"
 * }
 */

const deletePlayersFromGame = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {
    logger.warn(
      "Deleting user from game failed due validation error at " +
        error.path +
        " path, location: " +
        error.location
    );
    return next(new HttpError("Invalid input, check data.", 422));
  }

  const { gid, players } = req.body;

  try {
    const game = await Game.findById(gid);

    if (!game) {
      return next(new HttpError(`Game with id ${gid} not found`, 404));
    }

    for (const player_username of players) {
      const playerUser = await User.findOne({ username: player_username });

      if (!playerUser) {
        return next(
          new HttpError(`User with username ${player_username} not found`, 404)
        );
      }

      if (!game.players.includes(player_username)) {
        logger.warn("Someone tried deleting player that is not in the game.");
        return next(
          new HttpError(`User ${player_username} is not in the game`, 422)
        );
      }

      game.players = game.players.filter(
        (player) => player !== player_username
      );
      await game
        .save()
        .then(
          logger.info(
            "Successfully deleted player" + player_username + " from game"
          )
        );

      const gameIndex = playerUser.games_participate.indexOf(gid);
      if (gameIndex !== -1) {
        playerUser.games_participate.splice(gameIndex, 1);
        await playerUser
          .save()
          .then(
            logger.info(
              "Successfully deleted game " + gid + " from game_participate"
            )
          );
      }
    }

    game.updated_at = new Date();
    game
      .save()
      .then(logger.info(`Game has been updated at ${game.updated_at}`));

    res.status(200).json({ message: "Game has been successfully updated" });
  } catch (err) {
    logger.error(err);
    return next(
      new HttpError(
        "Error occured during fetching all users, please tell developers about it and tell time when it happened, ;3",
        500
      )
    );
  }
};

const deleteGame = async (req, res, next) => {
  const errors = validationResult(req);
  const error = errors.errors[0];
  if (!errors.isEmpty()) {
    logger.warn(
      `Creation failed due validation error at
        ${error.path}
          path, location:
            ${error.location}`
    );
    return next(new HttpError("Invalid input, check data.", 422));
  }
  const { gid } = req.params;

  try {
    const game = await Game.findById(gid);

    if (!game) {
      return next(new HttpError(`Game with id ${gid} not found`, 404));
    }

    const participants = await User.find({ games_participate: game._id });
    for (const participant of participants) {
      participant.games_participate = participant.games_participate.filter(
        (participatedGameId) =>
          participatedGameId.toString() !== game._id.toString()
      );
      await participant.save();
    }

    const gamesCreated = await User.find({ games_created: game._id });
    for (const created of gamesCreated) {
      created.games_created = created.games_created.filter(
        (createdGameId) => createdGameId.toString() !== game._id.toString()
      );
      await created.save();
    }

    await Game.findByIdAndDelete(gid);
    res.status(200).json({ message: "Game deleted successfully" });
    logger.info(`game with id of ${gid} was deleted`);
  } catch (err) {
    logger.error(err);
    return next(
      new HttpError("Could not delete the game, please try again.", 500)
    );
  }
};

exports.getGames = getGames;
exports.getGameById = getGameById;
exports.getGamesByUserId = getGamesByUserId;
exports.createGame = createGame;
exports.addPlayersToGame = addPlayersToGame;
exports.deletePlayersFromGame = deletePlayersFromGame;
exports.deleteGame = deleteGame;
