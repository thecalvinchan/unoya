//Setting up route
angular.module('unoya.public').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/signin', {
            templateUrl: '/views/signin.html'
        }).
        when('/', {
            templateUrl: '/views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
        /**
        when('/articles/create', {
            templateUrl: 'views/articles/create.html'
        }).
        when('/articles/:articleId/edit', {
            templateUrl: 'views/articles/edit.html'
        }).
        when('/articles/:articleId', {
            templateUrl: 'views/articles/view.html'
        }).
        when('/', {
            templateUrl: 'views/index.html'
        }).
        otherwise({
            redirectTo: '/'
        });
        **/
    }
]);

angular.module('unoya.user').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/settings', {
            templateUrl: '/views/user/settings.html'
        }).
        when('/', {
            templateUrl: '/views/user/dashboard.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

angular.module('unoya.admin').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/', {
            templateUrl: '/views/admin/create-campaign.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

angular.module('unoya.discover').config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/campaigns', {
            templateUrl: '/views/discover/campaigns.html'
        }).
        when('/campaign/suggest', {
            templateUrl: '/views/discover/suggest.html'
        }).
        when('/campaign/:campaignId', {
            templateUrl: '/views/discover/campaign.html'
        }).
        when('/', {
            templateUrl: '/views/discover/campaigns.html'
        }).
        otherwise({
            redirectTo: '/'
        });
    }
]);

//Setting HTML5 Location Mode
angular.module('unoya.public').config(['$locationProvider',
    function($locationProvider) {
        //$locationProvider.html5Mode(true);
        $locationProvider.hashPrefix("!");
    }
]);
