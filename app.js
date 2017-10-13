var app = angular.module("georanker", []);

app.controller('indexController', function($scope, $rootScope, $http, $interval, geoRankerService){	
	$scope.data = {};
	$scope.email;
	$scope.key;
	$scope.sessionCode;
	$scope.reports = [];


	$scope.getSessionCode = function  () {
		geoRankerService.getSessionCode($scope.email, $scope.key).then(function sucess (response) {
			$rootScope.pageLoading = false;
			$scope.sessionCode = response.data.session;
		}, function error () {
			$rootScope.pageLoading = false;
		});		
	};

	$scope.listReports = function  () {
		if(typeof $scope.sessionCode === 'undefined'){
			$scope.getSessionCode($scope.email, $scope.key);
			setTimeout(function (){				
				$scope.listReports($scope.email, $scope.key);			
			}, 1000);
		} else {			
			geoRankerService.getReports($scope.email, $scope.sessionCode).then(function sucess (response) {
				$rootScope.pageLoading = false;
				$scope.reports = response.data.items;
				$scope.update();
			}, function error (response) {
				$rootScope.pageLoading = false;
			});		
		}
	};

	$scope.update = function () {		
		$interval(function() {
			geoRankerService.getReports($scope.email, $scope.sessionCode).then(function sucess (response) {
				$scope.reports = response.data.items;				
			}, function error (response) {
				console.log(response.data);
			});	
		}, 3000);
	}

	$scope.createReport = function (data) {		
		$scope.searchengines = data.searchengines.split(',');
		$scope.countries = data.countries.split(',');
		$scope.keywords = data.keywords.split(',');

		data.searchengines = [];
		data.countries = [];
		data.keywords = [];

		$scope.searchengines.forEach(function (currentValue) {
			data.searchengines.push(currentValue);
		});

		$scope.countries.forEach(function (currentValue) {
			data.countries.push(currentValue);
		});

		$scope.keywords.forEach(function (currentValue) {
			data.keywords.push(currentValue);
		});

		geoRankerService.newReport($scope.email, $scope.sessionCode, data).then(function sucess (response) {
			console.log(response.data);
		}, function error (response) {
			console.log(response.data);			
		});

		delete $scope.data;
		
	}
});