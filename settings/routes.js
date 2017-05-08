var models = require('mongoose').models;
var auth;

var rest_api = function (model, app) {

    var controller = require('../api/' + model);
    var route_base = '/' + model;
    app.post(route_base,controller.create);
    app.get(route_base + '/:id', controller.get);
    app.get(route_base, controller.all);
    app.put(route_base + '/:id', controller.update);
    app.delete(route_base + '/:id', controller.delete);
    app.get('/', function (req, res) {
        res.render('index');
    });
 
    var actions = {
        add_post: function(url, action, call_anonymous) {
            if(typeof(action) == 'boolean') {
                call_anonymous = action;
                action = url;
            }
            if(call_anonymous) {
                app.post(route_base + "/" + url || action, controller[action]);
            } else {
                app.post(route_base + "/" + url || action, auth, controller[action]);
            }
            return actions;
        },
        add_get: function(url ,action, call_anonymous) {
            if(call_anonymous) {
                app.get(route_base + "/" + url || action, controller[action]);
            } else {
                app.get(route_base + "/" + url || action, auth.requires_token, controller[action]);
            }
            return actions;
        },
        add_put: function(url ,action, call_anonymous) {
            if(call_anonymous) {
                app.put(route_base + "/" + url , controller[action]);
            } else {
                app.put(route_base + "/" + url , auth.requires_token, controller[action]);
            }
            return actions;
        },
        add_delete: function(url ,action, call_anonymous) {
            if(call_anonymous) {
                app.delete(route_base + "/" + url  , controller[action]);
            } else {
                app.delete(route_base + "/" + url , auth.requires_token, controller[action]);
            }
            return actions;
        },

    };

    return actions;
};


module.exports.configure = function(app) {
    rest_api('posts', app);
    rest_api('users', app)
        .add_post(':userId/ssh-keys', 'sshCreate', true)
        .add_get(':userId/ssh-keys', 'getAll', true)
        .add_delete(':userId/ssh-keys/:sshKeyId', 'sshDelete', true)
};
