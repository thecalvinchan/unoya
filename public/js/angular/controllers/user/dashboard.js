angular.module('unoya.user').controller('DashboardController', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.title = 'Dashboard';
    $scope.subtitle = 'Hello World';
    $scope.activities = [
        {
            date : 'Jan 28',
            target : 'Kenny Shi',
            message : 'What\'s up bro!' 
        },
        {
            date : 'Jan 28',
            target : 'Kenny Shi',
            message : 'What\'s up bro!' 
        },
        {
            date : 'Jan 28',
            target : 'Kenny Shi',
            message : 'What\'s up bro!' 
        },
        {
            date : 'Jan 28',
            target : 'Kenny Shi',
            message : 'What\'s up bro!' 
        },
        {
            date : 'Jan 28',
            target : 'Kenny Shi',
            message : 'What\'s up bro!' 
        }
    ];
    $scope.campaigns = [
        {
            name : 'Kenny Shi',
            description : 'Kenny Shi description yo',
            image : '/img/test-pic.jpg' 
        },
        {
            name : 'Kenny Shi',
            description : 'Kenny Shi description yo',
            image : '/img/test-pic.jpg' 
        },
        {
            name : 'Kenny Shi',
            description : 'Kenny Shi description yo',
            image : '/img/test-pic.jpg' 
        },
        {
            name : 'Kenny Shi',
            description : 'Kenny Shi description yo',
            image : '/img/test-pic.jpg' 
        },
        {
            name : 'Kenny Shi',
            description : 'Kenny Shi description yo',
            image : '/img/test-pic.jpg' 
        },
        {
            name : 'Kenny Shi',
            description : 'Kenny Shi description yo',
            image : '/img/test-pic.jpg' 
        }
    ];
}]);
