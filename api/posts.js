var async = require('async');
var models = require('mongoose').models;
var response_helper = require('../helpers/response');
var post_validate = require('../validators/post');

exports.create =  function(req, res) {
    async.waterfall([
        function(cb){
            post_validate.post_form(req.body).is_valid(cb);
        },
        function(form, cb) {
            var post = new models.Post({
                title: form.data.title
            });
            post.save(cb);
        }
    ], function(err, post) {
        var response = response_helper(res);

        if (err) {
            return response.failure(err);
        }

        return response.data({
            id: post.id
        });
    });
};

exports.delete = function (req, res) {
    async.waterfall ([
        function(cb) {
            models.Post.findOneAndRemove({
                _id: req.params.id
            }, cb);
        }
    ],function(err, post) {
        if(err) response.failure(err);
        var response = response_helper(res);

        var message = "post deleted";
        return response.success(message);
    })
};

exports.update = function (req, res) {
    models.Post.findOneAndUpdate ({
        _id : req.params.id
    },{
        title : req.body.title
    },function(err, interest) {
        var response = response_helper(res);
        if (err) {
            return response.failure(err);
        }
        var message = "post updated";
        return response.success(message);
    })
};

exports.get = function (req, res) {
    models.Post.findOne({
        _id: req.params.id
    })
        .select('-__v')
        .exec(function(err, post) {
            var response = response_helper(res);
            if(err) return response.failure(err);
            return response.data(post);
        })
};

exports.all = function(req, res) {
    models.Post.find()
        .select('-__v')
        .exec(function(err, posts) {
            var response = response_helper(res);
            if(err) 
                return response.failure(err);
            return response.page(posts);
        })
};



















