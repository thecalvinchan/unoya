/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.render = function(req, res) {
    res.render('home', {
        user: req.user ? req.user : new User(),
        layout: false
    });
};
