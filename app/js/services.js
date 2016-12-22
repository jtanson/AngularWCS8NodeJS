var app = angular.module('angularWCS8.services', ['ngCookies']);

app.service('user', function ($cookies, $http, $window, $location) {
	this.setUserTokens = function(token, trustedToken)
	{
		$cookies.put('userToken', token);
		$cookies.put('userTrustedToken', trustedToken);
	}
	this.getUserToken = function()
	{
		return $cookies.get('userToken');
	}
	this.getUserTrustedToken = function()
	{
		return $cookies.get('userTrustedToken');
	}
	this.getHeaders = function()
	{
		return JSON.parse('{"wctoken": "'+this.getUserToken()+'", "wctrustedtoken": "'+this.getUserTrustedToken()+'"}');
	}
	/*this.logoutUser = function() {
		$http({
			method: 'POST',
			url: '/mdm/action/logoutAction',
	  	}).then(function successCallback(response) {
			if (response != null && response.data.Errors != null) {    				
				$scope.errors = response.data;
			} else {
				$cookies.remove('user');
				$cookies.remove('environment');
				$window.localStorage.clear();
				$location.path('/login');
			}
		}, function errorCallback(response) {
		 	$scope.errors = response.data;
		});
	}*/
})

