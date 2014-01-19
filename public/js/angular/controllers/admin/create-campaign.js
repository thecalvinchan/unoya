angular.module('unoya.admin').controller('CreateCampaignController', ['$scope', '$location', 'User','Campaigns',
    function ($scope, $location, User, Campaigns) {
        $scope.title = 'Create New Campaign';
        $scope.campaign = new Campaigns.all({});
        $scope.create = function() {
            var campaign = $scope.campaign;
            console.log(campaign);
            campaign.$save(function(data) {
                $scope.message = {
                    type : 'success',
                    description : 'Campaign created successfully.'
                };
            }, function(err) {
            });
        };
    }
]);
