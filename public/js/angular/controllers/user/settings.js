angular.module('unoya.user').controller('SettingsController', ['$scope', '$location', 'User',
    function ($scope, $location, User) {
        $scope.title = 'Account Settings';
        $scope.subtitle = 'User Information';
        User.get(function(user){
            $scope.user = user;
            if (user.provider == 'local') {
                $scope.localProvider = true;
            }
        });
        $scope.update = function() {
            var user = $scope.user;
            console.log(user);
            user.$update(function(data) {
                console.log(data);
                $scope.message = {
                    type : 'success',
                    description : 'Account settings updated successfully.'
                }
            }, function(err) {
                console.log(err);
                $scope.message = "An error occured.";
                $scope.message = {
                    type : 'warning',
                    description : 'An error occured.'
                }
            });
        }
    }
]);
