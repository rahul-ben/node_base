var mongoose = require('mongoose');
var models = require('mongoose').models;
var find_one_or_create = require('mongoose-find-one-or-create');

var User = mongoose.Schema({
    email: {type: String, default: ''},
    password: {type: String, default: ''},
    photo: {type: String, default: ''},
    twoStepAuth: {type: String, default: ''},
    phoneNumber: {type: String, default: ''},
    enableTwoStepAuthFor: {type: String, default: ''}
});

User.plugin(find_one_or_create);

mongoose.model('User', User);
