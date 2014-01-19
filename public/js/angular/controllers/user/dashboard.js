angular.module('unoya.user').controller('DashboardController', ['$scope', '$location', 'User', 'Campaigns',
    function ($scope, $location, User, Campaigns) {
        $scope.title = 'Dashboard';
        User.get(function(user){
            $scope.user = user;
            $scope.subtitle = 'Welcome back, ' + user.f_name + '!';
            Campaigns.all.query(function(data) {
                $scope.campaigns = [];
                console.log(data);
                for (var i=0;i<data.length;i++) {
                    if (user.following.indexOf(data[i]._id) != -1) {
                        $scope.campaigns.push({
                            id : data[i]._id,
                            name : data[i]._creator.f_name + ' ' + data[i]._creator.l_name,
                            description : data[i].short_desc,
                            image : data[i].feature.picture
                        });
                    };
                }
            }, function(err) {
                console.log(err);
            });
        });
        $scope.activities = [
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
