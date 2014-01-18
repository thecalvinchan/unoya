angular.module('unoya.user').controller('DashboardController', ['$scope', '$location', 'User',
    function ($scope, $location, User) {
        $scope.title = 'Dashboard';
        User.get(function(user){
            $scope.user = user;
            $scope.subtitle = 'Welcome back, ' + user.f_name + '!';
        });
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
    }
]);
