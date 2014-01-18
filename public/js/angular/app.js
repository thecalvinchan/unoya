'use strict';

angular.module('unoya.public',['ngRoute','unoya.system','unoya']);
angular.module('unoya.user',['ngRoute','ngResource','unoya.system','unoya']);
angular.module('unoya.discover',['ngRoute','ngResource','ngSanitize','unoya']);

angular.module('unoya',[]);

angular.module('unoya.system',[]);
angular.module('unoya.campaigns',[]);
