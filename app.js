var express = require('express');
var mongoose = require('mongoose');
var http = require('http');
var config = require('./settings/config');

var app = express();

require('./settings/database').configure(mongoose);
require('./settings/express').configure(app);
require('./settings/routes').configure(app);


var server = http.createServer(app);
var port = process.env.PORT || config.web_server.port || 3000;
server.listen(port, function() {
    console.log('express running');
});


exports.module = exports = app;
