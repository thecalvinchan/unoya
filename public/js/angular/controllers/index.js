angular.module('unoya.system').controller('IndexController', ['$scope', '$http', '$location',function ($scope,$http,$location) {
    $scope.email;
    $scope.submit = function() {
        var data = {
            email: $scope.email
        };
        $http.post('/users',data).success(function(data, status) {
            console.log(data);
            $location.path('success');
        }).error(function(data, status) {
            $scope.error = data.error;
            console.log(data);    
            console.log(status);
        });
    } 
}]);
