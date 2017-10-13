app = angular.module('georanker');
app.service('geoRankerService', function($http, $rootScope, baseUrl) {						
	
	this.getSessionCode = function(email, key) {
		$rootScope.pageLoading = true;
		return $http.get(baseUrl.api + '?email=' + email + '&apikey=' + key);
	};

	this.getReports = function(email, session) {
		return $http.get(baseUrl.report + '?email=' + email + '&session=' + session);
	};

	this.newReport = function(email, session, data) {
		return $http.post(baseUrl.newReport + '?email=' + email + '&session=' + session, data);
	};

});