/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

exports.userinfo = function(req, res) {
    res.render('account/userinfo', {
        user: req.user, 
        title: 'Account Information',
        subtitle: 'Tell us a little about yourself'
    });
};
