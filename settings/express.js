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
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');









var unprotected = [
 /\//,   
/\/login*/,
/\/assets\/*/,
/favicon.ico/
];

var redirectUnauthenticated = function(err, req, res, next) {
    console.log('Request [' + err.status + '] was for ' + req.path);
    res.json({
        message: 'request is not authorized'
    });
};

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://development0.eu.auth0.com/.well-known/jwks.json"
    }),
    audience: 'http://localhost:3000/',
    issuer: "https://development0.eu.auth0.com/",
    algorithms: ['RS256']
});


module.exports.configure = function(app) {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(jwtCheck.unless({path: unprotected}), redirectUnauthenticated );

    var root = path.normalize(__dirname + './../');
    app.set('views', path.join(root, 'views'));
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(root, 'public')));
};