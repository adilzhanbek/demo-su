const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/userModel");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_TOKEN,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      console.log(jwt_payload.id);
      const user = await User.findById(jwt_payload.id); //users.find(u => u.username === jwt_payload.username);
      console.log(user);
      if (user) {
        return done(null, user);
      }

      return done(null, false);
    })
  );
};
