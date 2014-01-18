//Articles service used for articles REST endpoint
angular.module('unoya.discover').factory("Campaigns", ['$resource', function($resource) {
    var campaigns = {};
    campaigns.all = $resource('campaigns', {
        articleId: '@_id'
    });
    campaigns.one = $resource('campaigns/:campaignId', {
        campaignId: '@_id'
    });
    return campaigns;
}]);
