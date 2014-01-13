//Setting up route
angular.module('unoya').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/success', {
            templateUrl: 'views/success.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
/**
angular.module('unoya').config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.hashPrefix("!");
    }
]);
**/
