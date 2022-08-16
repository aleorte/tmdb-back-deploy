const express = require("express");
const db = require("./db");
const router = require("./routes");
const {User, Favorite} = require("./models");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const passport = require("passport");
const cors= require("cors")
const localStrategy = require("passport-local").Strategy;

const app = express();

app.use(cors())

app.use(express.json());


app.use(cookieParser());

app.use(
  sessions({
    secret: "SECRET",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({ where: { email } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false);
            }
            return done(null, user);
          });
        })
        .catch(done);
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id)
    .then((user) => done(null, user))
    .catch(done);
});

app.use("/api", router);

db.sync({ force: false})
  .then(() => {
    app.listen(process.env.PORT||3001, () => {
      console.log("server on");
    });
  })
  .catch((err) => {
    console.log(err);
  });
