'use strict';

angular.module('unoya.public',['ngRoute','unoya.system','unoya.campaigns']);
angular.module('unoya.user',['ngRoute','ngResource','unoya.system','unoya.campaigns']);
angular.module('unoya.discover',['ngRoute','ngResource','ngSanitize','unoya.system','unoya.campaigns']);

angular.module('unoya.system',[]);
angular.module('unoya.campaigns',[]);
