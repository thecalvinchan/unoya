var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    TwitterStrategy = require('passport-twitter').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    DwollaStrategy = require('passport-dwolla').Strategy,
    GitHubStrategy = require('passport-github').Strategy,
    GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
    User = mongoose.model('User'),
    fbgraph = require('fbgraph');
    config = require('./config');

console.log(config.facebook.clientID);

module.exports = function(passport) {
    //Serialize sessions
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        User.findOne({
            _id: id
        }, '-salt -hashed_password', function(err, user) {
            done(err, user);
        });
    });

    //Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                email: email
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }
                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid password'
                    });
                }
                return done(null, user);
            });
        }
    ));

    //Use twitter strategy
    passport.use(new TwitterStrategy({
            consumerKey: config.twitter.clientID,
            consumerSecret: config.twitter.clientSecret,
            callbackURL: config.twitter.callbackURL
        },
        function(token, tokenSecret, profile, done) {
            User.findOne({
                'twitter.id_str': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        username: profile.username,
                        email: profile.username+'@twitter.com',
                        picture: profile._json['profile_image_url'],
                        provider: 'twitter',
                        twitter: profile._json,
                        twitter_token: {
                            access_token: token,
                            access_token_secret: tokenSecret
                        }
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    user.twitter_token = {
                        access_token: token,
                        access_token_secret: tokenSecret
                    };
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                }
            });
        }
    ));

    //Use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            console.log("ACCESS_TOKEN " +  accessToken);
            User.findOne({
                'facebook.id': profile.id
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    fbgraph.setAccessToken(accessToken);
                    user = new User({
                        f_name: profile.name.givenName,
                        l_name: profile.name.familyName,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'facebook',
                        facebook: profile._json
                    });
                    fbgraph.setAccessToken(accessToken);
                    fbgraph.get('me?fields=picture.width(350)', {access_token: accessToken}, function(err, res) {
                        user.picture = res.picture.data.url;
                        console.log(res.picture.data.url);
                        fbgraph.extendAccessToken({
                            "client_id": config.facebook.clientID,
                            "client_secret": config.facebook.clientSecret
                        }, function(err,res) {
                            user.facebook_token = res;
                            user.save(function(err) {
                                if (err) console.log(err);
                                return done(err, user);
                            });
                        });
                    });
                } else {
                    fbgraph.setAccessToken(accessToken);
                    fbgraph.get('me?fields=picture.width(350)', {access_token: accessToken}, function(err, res) {
                        user.picture = res.picture.data.url;
                        console.log("FACEBOOK RESPONSE " + res);
                        console.log(res);
                        fbgraph.extendAccessToken({
                            "client_id": config.facebook.clientID,
                            "client_secret": config.facebook.clientSecret
                        }, function(err,res) {
                            user.facebook_token = res;
                            user.save(function(err) {
                                if (err) console.log(err);
                                return done(err, user);
                            });
                        });
                    });
                }
            });
        }
    ));

    //Use github strategy
    passport.use(new GitHubStrategy({
            clientID: config.github.clientID,
            clientSecret: config.github.clientSecret,
            callbackURL: config.github.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({
                'github.id': profile.id
            }, function(err, user) {
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'github',
                        github: profile._json
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));

    //Use google strategy
    passport.use(new GoogleStrategy({
            clientID: config.google.clientID,
            clientSecret: config.google.clientSecret,
            callbackURL: config.google.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            User.findOne({
                'google.id': profile.id
            }, function(err, user) {
                if (!user) {
                    user = new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        username: profile.username,
                        provider: 'google',
                        google: profile._json
                    });
                    user.save(function(err) {
                        if (err) console.log(err);
                        return done(err, user);
                    });
                } else {
                    return done(err, user);
                }
            });
        }
    ));
};
