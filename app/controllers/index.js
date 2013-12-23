/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.render = function(req, res) {
    if (req.user)
        res.redirect('/account/userinfo');
    res.render('home', {
        user: req.user ? req.user : new User(),
        layout: false
    });
};
