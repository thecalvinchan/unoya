/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Campaign = mongoose.model('Campaign'),
    _ = require('lodash');


/**
 * Find article by id
 */
exports.campaign = function(req, res, next, id) {
    Campaign.load(id, function(err, campaign) {
        if (err) return next(err);
        if (!campaign) return next(new Error('Failed to load article ' + id));
        req.campaign = campaign;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res) {
    var campaign = new Campaign(req.campaign);
    campaign._creator = req.user;
    console.log(campaign);
    
    campaign = _.extend(campaign, req.body);
    console.log(campaign);

    campaign.save(function(err) {
        if (err) {
            console.log(err);
            return res.send('/#signin', {
                errors: err.errors
            });
        } else {
            res.jsonp(campaign);
        }
    });
};

exports.follow = function(req, res) {
    var campaign = req.campaign;
    campaign = _.extend(campaign, req.body);
    console.log(campaign);
    req.user.following.push(campaign._id);
    console.log(req.user);
    campaign.save(function(err) {
        if (err) {
            return res.send(400, {
                error: "Error while following"
            });
        }
        res.jsonp(campaign);
    });
};

/**
 * Update a article
 */
exports.update = function(req, res) {
    var campaign = req.campaign;

    campaign = _.extend(campaign, req.body);

    campaign.save(function(err) {
        res.jsonp(campaign);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res) {
    var campaign = req.campaign;

    campaign.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(campaign);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.campaign);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Campaign.find().
        sort('-created').
        populate('_creator', 'f_name l_name picture username').
        populate('_followers','username picture').
        exec(function(err, campaigns) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                res.jsonp(campaigns);
            }
    });
};

exports.render = function(req, res) {
    res.render('campaigns', {
        user: req.user, 
    });
};
