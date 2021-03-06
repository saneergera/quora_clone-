const passport = require("passport");
require("../models/users.js");
const mongoose = require("mongoose");
const User = mongoose.model("Users");

const FacebookStrategy = require("passport-facebook").Strategy;
const googleAuth = require("passport-google-oauth20").Strategy;

module.exports = () => {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(
    new FacebookStrategy(
      {
        clientID: "346588629234943",
        clientSecret: "76be48b651064f5062bf840442d93081",
        callbackURL:
          "https://lit-ravine-45313.herokuapp.com/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"]
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("hello");
        console.log(profile);
        const existingUser = await User.findOne({
          email: profile.emails[0].value
        });
        if (existingUser) {
          console.log("abc");
          done(null, existingUser);
        } else {
          const user = await new User({
            facebook_id: profile.id,
            email: profile.emails[0].value,
            Name: profile.displayName,
            NewUser: 1
          }).save();
          console.log("def");
          done(null, user);
        }
      }
    )
  );

  passport.use(
    new googleAuth(
      {
        clientID:
          "132106563028-cn52r9m77ungo2vj3bbipq3nck3uov6m.apps.googleusercontent.com",
        clientSecret: "fNQLv4TwBWV1AT_MRmwM5YsP",
        callbackURL: "/auth/google/callback"
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        const existingUser = await User.findOne({
          email: profile.emails[0].value
        });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const user = await new User({
            google_id: profile.id,
            email: profile.emails[0].value,
            Name: profile.displayName,
            NewUser: 1
          }).save();
          done(null, user);
        }
      }
    )
  );
};
