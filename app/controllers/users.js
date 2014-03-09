/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    _ = require('lodash');

exports.index = function(req, res) {
    res.render('user', {
        user: req.user, 
    });
};

/**
 * Auth callback
 */
exports.authCallback = function(req, res, next) {
    res.redirect('/');
};


/**
 * Logout
 */
exports.signout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * Session
 */
exports.session = function(req, res) {
    res.redirect('/account');
};

/**
 * Create user
 */
exports.create = function(req, res) {
    var user = new User(req.body);
    var message = null;

    user.provider = 'local';
    user.save(function(err) {
        if (err) {
            switch(err.code){
                case 11000:
                case 11001:
                    message = 'Username already exists';
                    break;
                default: 
                    message = 'Please fill all the required fields';
            }

            //return res.render('users/signup', {
            //    message: message,
            //    user: user
            //});
            res.send(400, {
                message: message,
                user: user
            });
            return;
        }
        req.logIn(user, function(err) {
            if (err) return next(err);
            return res.redirect('/account/#/settings');
        });
    });
};

/**
 * Update User
 */
exports.update = function(req, res) {
    var user = req.user;
    user = _.extend(user, req.body);
    user.save(function(err) {
        if (err) {
            return res.send(400, {
                error: "Error while updating user"
            });
        }
        res.jsonp(user);
    });
};

exports.changePassword = function(req, res) {
    var user = req.user;
    res.jsonp(user);
}

/**
 * Send User
 */
exports.me = function(req, res) {
    res.jsonp(req.user || null);
};

/**
 * Find user by id
 */
exports.user = function(req, res, next, id) {
    User
        .findOne({
            _id: id
        })
        .exec(function(err, user) {
            if (err) return next(err);
            if (!user) return next(new Error('Failed to load User ' + id));
            req.profile = user;
            next();
        });
};
