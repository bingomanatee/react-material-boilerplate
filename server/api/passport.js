var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
import { Router } from 'express';

const twitterAuth = require('./../.auth/twitter.json');

passport.use(new Strategy({
      consumerKey: twitterAuth.consumer_key,
      consumerSecret: twitterAuth.consumer_secret,
      callbackURL: 'http://127.0.0.1:3000/user/twitter/return'
  },
  function (token, tokenSecret, profile, cb) {
      // In this example, the user's Twitter profile is supplied as the user
      // record.  In a production-quality application, the Twitter profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile);
  }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());

    var router = new Router();

    router.get('/logout', (req, res) => {
          req.logout();
          res.redirect('/');
      }
    );

    router.get('/profile', (req, res) => {
        if (!req.user) {
            res.send({user: false});
        } else {
            res.send({user: req.user});
        }
    });

    app.use('/user', router);
};