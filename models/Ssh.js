var mongoose = require('mongoose');
var models = require('mongoose').models;
var find_one_or_create = require('mongoose-find-one-or-create');

var Ssh = mongoose.Schema({
    name: {type: String, default: ''},
    key: {type: String, default: ''},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
});

Ssh.plugin(find_one_or_create);

mongoose.model('Ssh', Ssh);
