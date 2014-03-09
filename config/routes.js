module.exports = function(app, passport, auth) {
    //User Routes
    var index = require('../app/controllers/index');
    var users = require('../app/controllers/users');
    //app.get('/signin', users.signin);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);
    app.get('/users/me', users.me);
    app.post('/users/me', users.update);
    app.get('/users/password', users.changePassword);

    //Setting the local strategy route
    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.session);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me', 'publish_actions'],
        failureRedirect: '/signin'
    }), index.render);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), index.render);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Campaign Routes
    var campaigns = require('../app/controllers/campaigns');
    app.get('/campaigns', campaigns.all);
    app.post('/campaigns', auth.requiresLogin, campaigns.create);
    app.get('/campaigns/:campaignId', campaigns.show);
    app.post('/following/campaigns/:campaignId', auth.requiresLogin, campaigns.follow);
    app.put('/campaigns/:campaignId', auth.requiresLogin, auth.campaign.hasAuthorization, campaigns.update);
    app.del('/campaigns/:campaignId', auth.requiresLogin, auth.campaign.hasAuthorization, campaigns.destroy);

    //Finish with setting up the articleId param
    app.param('campaignId', campaigns.campaign);

    //Home route
    app.get('/', index.render);
    app.get('/signin', index.render);

    //Account routes
    var auth = require('./middlewares/authorization');
    app.get('/account', auth.requiresLogin, users.index);
    app.get('/account/dashboard', auth.requiresLogin, users.index);
    app.get('/account/userinfo', auth.requiresLogin, users.index);

    //Campaign Routes
    app.get('/discover', campaigns.render);

    var admin = require('../app/controllers/admin');
    app.get('/secret/newcampaign', auth.requiresLogin, auth.user.hasAdmin, admin.create);
    app.get('/secret/sendposts', auth.requiresLogin, auth.user.hasAdmin, admin.sendPosts);
    app.get('/secret/sendtweets', auth.requiresLogin, auth.user.hasAdmin, admin.sendTweets);
};
