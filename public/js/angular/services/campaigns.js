//Articles service used for articles REST endpoint
angular.module('unoya').factory("Campaigns", ['$resource', function($resource) {
    var campaigns = {};
    campaigns.all = $resource('campaigns', {
        articleId: '@_id'
    }, {
        save : {
            method : 'POST',
            url : '/campaigns'
        }
    });
    campaigns.one = $resource('campaigns/:campaignId', {
        campaignId: '@_id'
    }, {
        follow : {
            method : 'POST',
            url : 'following/campaigns/:campaignId'
        }
    });
    return campaigns;
}]);
