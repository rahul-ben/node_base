var async = require('async');
var models = require('mongoose').models;
var response_helper = require('../helpers/response');
var ssh_validate = require('../validators/ssh');

exports.create =  function(req, res) {
    async.waterfall([
        function(cb) {
            var user = new models.User({
                "photo": req.body.photo,
                "email": req.body.email,
                "twoStepAuth": req.body.twoStepAuth,
                "phoneNumber": req.body.phoneNumber,
                "enableTwoStepAuthFor": req.body.enableTwoStepAuthFor,
            });
            user.save(cb);
        }
    ], function(err, user) {
        var response = response_helper(res);
        if (err) {
            return response.failure(err);
        }

        return response.data({
            id: user.id
        });
    });
};




exports.sshCreate =  function(req, res) {
    async.waterfall([
        function(cb){
            ssh_validate.ssh_form(req.body).is_valid(function(err, form) {
                if(err) return cb(err);
                cb(null, form.data);
            });
        },
        function(form, cb) {
            var ssh = new models.Ssh({
                "name": form.name,
                "key": form.key,
                "user": req.params.userId
            });
            ssh.save(cb);
        }
    ], function(err, ssh) {
        var response = response_helper(res);
        if (err) {
            return response.failure(err);
        }

        return response.data({
            id: ssh.id
        });
    });
};


exports.sshDelete = function (req, res) {
    async.waterfall ([
        function(cb) {
            models.Ssh.findOneAndRemove({
                _id: req.params.sshKeyId
            }, cb);
        }
    ],function(err, ssh) {
        if(err) response.failure(err);
        var response = response_helper(res);

        var message = "ssh deleted";
        return response.success(message);
    })
};













/* ================================================Yet To Implement=========================================================*/




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
        });
};




exports.getAll = function(req, res) {
    models.Ssh.find()
        .select('-__v')
        .where('user').equals(req.params.userId)
        .populate({
            path: 'user',
            select: 'email'
        })
        .exec(function(err, ssh) {
            var response = response_helper(res);
            if(err) 
                return response.failure(err);
            return response.page(ssh);
        })
};
