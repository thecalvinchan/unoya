/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

exports.dashboard = function(req, res) {
    res.render('account/dashboard', {
        user: req.user, 
        title: 'Dashboard'
    });
};

exports.userinfo = function(req, res) {
    res.render('account/userinfo', {
        user: req.user, 
        title: 'Account Information',
        subtitle: 'Tell us a little about yourself'
    });
};
