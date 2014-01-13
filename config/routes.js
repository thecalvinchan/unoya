module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/users/me', users.me);

    //Setting up the users api
    app.post('/users', users.create);

    //Home route
    var index = require('../app/controllers/index');
    app.get('/', index.render);
};
