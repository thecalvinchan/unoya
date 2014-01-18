angular.module('unoya.discover').controller('CampaignController', ['$scope', '$routeParams', '$sanitize','Campaigns','User',
    function ($scope, $routeParams, $sanitize, Campaigns, User) {
        Campaigns.one.get({
            campaignId: $routeParams.campaignId  
        }, function(campaign) {
            var name = [campaign._creator.f_name,campaign._creator.l_name];
            $scope.title = campaign.title;
            $scope.name = name.join(' ');
            $scope.subtitle = 'is fighting against colon cancer.';
            $scope.campaign = campaign;
            $scope.content = campaign.content;
            //$scope.followers = campaign._followers.length;
            User.get(function(user) {
                var following = user.following.indexOf(campaign._id);
                console.log(following);
                if (following != -1) {
                    $scope.following = true;
                    $scope.message = {
                        type : 'success',
                        description : 'You are already following ' + $scope.name + '\'s campaign!'
                    };
                } else {
                    $scope.following = false;
                }
                $scope.follow = function() {
                    if ($scope.following) {
                        //alert('Already following 1');
                        $scope.following = true;
                        $scope.message = {
                            type : 'success',
                            description : 'You are already following ' + $scope.name + '\'s campaign!'
                        };
                        return;
                    }
                    user.following.push(campaign._id);
                    user.$update(function(data) {
                        if (campaign._followers.indexOf(user._id) != -1) {
                            //alert('Already following 2');
                            $scope.$apply(function(){
                                $scope.following = true;
                                $scope.message = {
                                    type : 'success',
                                    description : 'You are already following ' + $scope.name + '\'s campaign!'
                                };
                            });
                            return;
                        }
                        campaign._followers.push(user._id);
                        console.log(campaign._followers);
                        campaign.$follow(function(data) {
                            console.log(data);
                            $scope.following = true;
                            $scope.message = {
                                type : 'success',
                                description : 'You are now following ' + $scope.name +'\'s campaign!'
                            };
                        }, function(err) {
                            console.log(err);
                            $scope.message = {
                                type : 'warning',
                                description : 'An error occured.'
                            };
                        });    
                    });
                };
            }, function(err) {
                console.log(err);
            });
        });
    }
]);
