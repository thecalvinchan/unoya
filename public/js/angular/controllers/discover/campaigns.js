angular.module('unoya.discover').controller('CampaignsController', ['$scope', '$location', 'Campaigns',
    function ($scope, $location, Campaigns) {
        $scope.title = 'Campaigns';
        $scope.subtitle = 'Help make life beautiful.';
        Campaigns.all.query(function(data) {
            $scope.campaigns = data;
            console.log(data);
        }, function(err) {
        });
    }
]);
