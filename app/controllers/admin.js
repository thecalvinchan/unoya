var mongoose = require('mongoose'),
    Campaign = mongoose.model('Campaign'),
    User = mongoose.model('User'),
    fbgraph = require('fbgraph'),
    twit = require('twit'),
    config = require('../../config/config'),
    _ = require('lodash');
    

exports.create = function(req,res) {
    res.render('create-campaign', {
        user: req.user,
    });
};

exports.sendPosts = function(req,res) {
    if (req.user.email != "calvin.chan.h@gmail.com") {
        res.render('error', {
            status: 500,
            message: 'Not Authorized'
        });
    }
    Campaign.find().
        sort('-created').
        populate('_creator', 'f_name l_name picture username').
        populate('_followers','facebook_token').
        exec(function(err, campaigns) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                for(var i=0;i<campaigns.length;i++) {
                    var wallPost = campaigns[i].full_desc;
                    var url = 'http://www.unoya.org/discover#/campaign/'+campaigns[i]._id;
                    for(var j=0;j<campaigns[i]._followers.length;j++) {
                        var pledge = campaigns[i]._followers[j];
                        if (pledge.facebook_token) {
                            var fbtoken = pledge.facebook_token;
                            fbgraph.post('me/feed', {
                                access_token: fbtoken.access_token,
                                message: wallPost,
                                name: campaigns[i].title,
                                picture: campaigns[i].feature.picture,
                                link: url,
                                with_tags: [{
                                    name:'unoya',
                                    id:207214816133811
                                }]
                            }, function(err,res) {
                                if(err) {
                                    console.log("Post for user "+fbtoken.access_token+" failed");
                                    console.log(err);
                                } else {
                                    console.log("Post for user "+fbtoken.access_token+" was a success.");
                                }
                            });
                        }
                    }
                }
                res.jsonp({});
            }
        });
};

exports.sendTweets = function(req,res) {
    if (req.user.email != "calvin.chan.h@gmail.com") {
        res.render('error', {
            status: 500,
            message: 'Not Authorized'
        });
    }
    Campaign.find().
        sort('-created').
        populate('_creator', 'f_name l_name picture username').
        populate('_followers','twitter_token').
        exec(function(err, campaigns) {
            if (err) {
                res.render('error', {
                    status: 500
                });
            } else {
                for(var i=0;i<campaigns.length;i++) {
                    var url = 'http://www.unoya.org/discover#/campaign/'+campaigns[i]._id;
                    for(var j=0;j<campaigns[i]._followers.length;j++) {
                        var pledge = campaigns[i]._followers[j];
                        console.log("Attempting Twitter");
                        console.log(config.twitter.clientID);
                        if (pledge.twitter_token) {
                            console.log("Attempting Twitter");
                            console.log(config.twitter.clientID);
                            var T = new twit({
                                consumer_key: config.twitter.clientID,
                                consumer_secret: config.twitter.clientSecret,
                                access_token: pledge.twitter_token.access_token,
                                access_token_secret: pledge.twitter_token.access_token_secret
                            });
                            T.post('statuses/update', { 
                                status: campaigns[i].short_desc + ' @_unoya ' + url
                            }, function(err, reply) {
                                if (err) console.log(err);
                                console.log("TWEET SENT");
                                console.log(reply);
                            });
                    
                        }
                    }
                }
                res.jsonp({});
            }
        });
};
