const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_TOKEN, { expiresIn: "3h" });
};

const generateRefreshToken = (id) => { // doesn't work
  return jwt.sign(
    {id},
    process.env.JWT_TOKEN,
    { expiresIn: "1d" }
  );
};

exports.generateToken = generateToken;
exports.generateRefreshToken = generateRefreshToken;
