/**
 * Module dependencies.
 */
var mongoose = require('mongoose');


exports.render = function(req, res) {
    res.render('home', {
        user: req.user ? JSON.stringify(req.user) : "null"
    });
};
