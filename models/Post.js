var mongoose = require('mongoose');
var models = require('mongoose').models;
var find_one_or_create = require('mongoose-find-one-or-create');

var Post = mongoose.Schema({
    title: {type: String, default: ''}
});

Post.plugin(find_one_or_create);

mongoose.model('Post', Post);
