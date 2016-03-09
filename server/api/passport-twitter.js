var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
import { Router } from 'express';
import { getUserModel } from '../model/getUserModel';
const twitterAuth = require('./../.auth/twitter.json');
const mongoAuth = require('./../.auth/mongodb.json');
let User = null;

console.log('-------------- passport: loading auth', mongoAuth);
var t = setTimeout(() => {
    console.log('---------- long delay to load class');
}, 2000);
getUserModel(mongoAuth).then(pUser => {
    console.log('-----------------retrieved user class:', pUser);
    User = pUser;
    clearTimeout(t);
}, err => {
    console.log('---------------- error retrieving user class: ', err, mongoAuth);
    clearTimeout(t);
});

passport.use(new Strategy({
      consumerKey: twitterAuth.consumer_key,
      consumerSecret: twitterAuth.consumer_secret,
      callbackURL: 'http://localhost:3000/user/twitter/return'
  },
  function (token, tokenSecret, profile, cb) {
      // In this example, the user's Twitter profile is supplied as the user
      // record.  In a production-quality application, the Twitter profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      profile.twitter_token = token;
      profile.twitter_token_secret = tokenSecret;

      User.findOrCreateTwitter(profile)
        .then((user) => {
            console.log('user created:', user);
            cb(null, profile);
        }, cb);
  }));

passport.serializeUser(function (user, cb) {
    console.log('========= serializing:', user);
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    console.log('========== deserializing', obj);
    cb(null, obj);
});

module.exports = app => {
    var router = new Router();

    router.get('/return',
      passport.authenticate('twitter', {failureRedirect: '/user/twitter/login'}),
      (req, res) => res.redirect('/')
    );

    router.get('/login',
      passport.authenticate('twitter')
    );

    /**
     * the reason these searches are in passport is that using the user ID puts the resource
     * bottleneck on each individual user -- as opposed to bottlenecking by the entire app.
     */

    router.get('/status', (req, res) => {
        var uri = 'https://api.twitter.com/1.1/statuses/home_timeline.json';

        passport._strategies.twitter._oauth._performSecureRequest(
          req.user.twitter_token,
          req.user.twitter_token_secret,
          'GET',
          uri,
          null,
          null, null, function (err, data) {
              if (!err) {
                  var jsonData = JSON.parse(data);
                  res.send(jsonData);
              } else {
                  res.status(400).send(err);
              }
          });

    });

    router.post('/usersearch', (req, res) => {

        if (!req.body && req.body.q) {
            return res.status(400).send({error: 'no q'});
        }
        var uri = 'https://api.twitter.com/1.1/users/search.json?include_entities=false&q=' + encodeURIComponent(req.body.q);
        passport._strategies.twitter._oauth._performSecureRequest(
          req.user.twitter_token,
          req.user.twitter_token_secret,
          'GET',
          uri,
          null,
          null, null, function (err, data) {
              if (!err) {
                  var jsonData = JSON.parse(data);
                  res.send(jsonData);
              } else {
                  res.status(400).send(err);
              }
          });

    });

    router.post('/usertimeline', (req, res) => {

        if (!req.body && req.body.q) {
            return res.status(400).send({error: 'no q'});
        }
        var uri = 'https://api.twitter.com/1.1/statuses/user_timeline.json?include_entities=false&user_id=' + encodeURIComponent(req.body.user_id);
        passport._strategies.twitter._oauth._performSecureRequest(
          req.user.twitter_token,
          req.user.twitter_token_secret,
          'GET',
          uri,
          null,
          null, null, function (err, data) {
              if (!err) {
                  var jsonData = JSON.parse(data);
                  res.send(jsonData);
              } else {
                  res.status(400).send(err);
              }
          });

    });

    router.get('/user/:id', (req, res) => {

        if (!req.body && req.body.q) {
            return res.status(400).send({error: 'no q'});
        }
        var uri = 'https://api.twitter.com/1.1/users/show.json?include_entities=false&user_id=' + req.params.id;
        console.log('searching twitter for ', req.params.id);
        passport._strategies.twitter._oauth._performSecureRequest(
          req.user.twitter_token,
          req.user.twitter_token_secret,
          'GET',
          uri,
          null,
          null, null, function (err, data) {
              console.log('result for ', req.params.id, err, data);
              if (err) {
                  res.status(400).send(err);
              } else {
                  var jsonData = JSON.parse(data);
                  res.send(jsonData);
              }
          });

    });

    app.use('/user/twitter', router);
};
