var express = require('express');
var path = require('path');
var config = require('./config');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dotenv = require('dotenv');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');



dotenv.load();

// var routes = require('./routes/index');
// var user = require('./routes/user');

// This will configure Passport to use Auth0
var strategy = new Auth0Strategy({
    domain:      'development0.eu.auth0.com',
    clientID:     'AABWsAfpCZ0KgtLfZtyZDc47FC6mCKoU',
    clientSecret:  'MCW-NYYqTvnJVclYbqYkN-v10C-4jQ7Vfeti6jpP5aTeTcapxzoilbD0PyfzQDdA',
    callbackURL:   'http://localhost:3000/callback'
  }, function(accessToken, refreshToken, extraParams, profile, done) {
    console.log(extraParams.id_token);
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  });
var routes = require('./../routes/index');
var user = require('./../routes/user');
passport.use(strategy);
    

// you can use this section to keep a smaller payload
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});









module.exports.configure = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser());
    app.use(session({
        secret: 'shhhhhhhhh',
        resave: true,
        saveUninitialized: true
    }));
    
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/', routes);
    app.use('/user', user);
   
    

    var root = path.normalize(__dirname + './../');
    app.set('views', path.join(root, 'views'));
    app.set('view engine', 'pug');
    app.use(express.static(path.join(root, 'public')));

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));


    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
    });


};