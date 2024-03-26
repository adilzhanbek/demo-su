const express = require('express')
const mongoose = require('mongoose')
const helmet = require("helmet")
const bodyParser = require('body-parser')
const dotenv = require("dotenv").config()

const passport = require('passport')
require('./app/utils/passport-config')(passport)

const HttpError = require("./app/models/httpError")
const logger = require("./app/utils/logger")

const app = express()
app.use(passport.initialize())
app.use(bodyParser.json())
app.use(
  helmet({
    frameguard: {
      // configure
      action: "deny",
    },
    contentSecurityPolicy: {
      // enable and configure
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["style.com"],
      },
    },
    dnsPrefetchControl: false, // disable
    crossOriginEmbedderPolicy: false,
  })
);
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));

const userRoutes = require('./app/routes/userRoutes');
const gameRoutes = require('./app/routes/gameRoutes');

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error;
});

// error handler middleware
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.code || 500)
  res.send({error: err.message })
})

mongoose
  .connect(process.env.dbString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })  
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((err) => {
    logger.error("Cannot connect to MongoDB\n Error stack:\n" + err);
    process.exit();
  });

app.get('/protected', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.send("You got protected route")
})

app.listen(process.env.PORT || 8001)