var mongoose = require('mongoose'),
    Campaign = mongoose.model('Campaign'),
    User = mongoose.model('User'),
    fbgraph = require('fbgraph'),
    _ = require('lodash');

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
                        var fbtoken = campaigns[i]._followers[j].facebook_token;
                        fbgraph.post('me/feed', {
                            access_token: fbtoken.access_token,
                            message: wallPost,
                            name: campaigns[i].title,
                            picture: campaigns[i]._creator.picture,
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
                        //console.log(fbtoken);
                    }
                }
                res.jsonp({});
            }
        });
};
