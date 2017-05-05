var mongoose = require('mongoose');
var Comment =  require('./Post');

var Comment = mongoose.Schema({
    text: { type: String, default: ''},
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    created_At: { type : Date, default: Date.now },
    updated_At: { type : Date, default: Date.now },
});


Comment.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

mongoose.model('Comment', Comment);