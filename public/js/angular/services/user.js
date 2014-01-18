//Global service for global variables
angular.module('unoya.user').factory('User', ['$resource',
    function($resource) {
        var _this = this;
        var user = $resource('users/me', null, {
            update : {
                method : 'POST'
            }
        });
        user.get(function (data) {
            console.log(data);
            user.data = data;
        });
        //_this._data = {
        //    user: window.user,
        //    authenticated: !! window.user
        //};
        return user;
    }
]);

angular.module('unoya.discover').factory('User', ['$resource',
    function($resource) {
        var _this = this;
        var user = $resource('users/me', null, {
            update : {
                method : 'POST'
            }
        });
        user.get(function (data) {
            console.log(data);
            user.data = data;
        });
        //_this._data = {
        //    user: window.user,
        //    authenticated: !! window.user
        //};
        return user;
    }
]);
