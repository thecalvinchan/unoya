/**
 * Module dependencies.
 */
var mongoose = require('mongoose');

exports.index = function(req, res) {
    res.render('user', {
        user: req.user, 
        title: '{{title}}'
    });
};
