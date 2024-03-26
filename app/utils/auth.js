const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const HttpError = require("../models/httpError");
const dotenv = require("dotenv").config();

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (token && token.startsWith("Bearer") && token.length > 10) {
    try {
      const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_TOKEN);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      return next(new HttpError("Error stack" + err, 500));
    }
  }

  if (!token || token.length < 10) {
    return next(new HttpError("Not authorized.", 401));
  }
};

exports.protect = protect;
