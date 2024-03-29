/**
 * Generic require login routing middleware
 */
exports.requiresLogin = function(req, res, next) {
    if (!req.isAuthenticated()) {
        req.flash('auth-error','You must be logged in to do that!');
        return res.redirect('/#/signin');
    }
    next();
};

/**
 * User authorizations routing middleware
 */
exports.user = {
    hasAuthorization: function(req, res, next) {
        if (req.profile.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    },
    hasAdmin: function(req, res, next) {
        if (req.user.email != 'calvin.chan.h@gmail.com') {
            return res.send(401, 'User is not an administrator');
        }
        next();
    }
};

/**
 * Article authorizations routing middleware
 */
exports.campaign = {
    hasAuthorization: function(req, res, next) {
        if (req.campaign._creator.id != req.user.id) {
            return res.send(401, 'User is not authorized');
        }
        next();
    }
};
