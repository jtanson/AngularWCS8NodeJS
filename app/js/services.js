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
		$cookies.remove('userToken');
		$cookies.remove('userTrustedToken');
		$window.localStorage.clear();
		$location.path('/login');
	}*/
});
app.service('cart', function ($cookies, $http, $window, $location) {
	var isEmpty = true;
	this.getCartEmptyFlag = function()
	{
		return isEmpty;
	}
	this.setCartEmptyFlag = function(bool)
	{
		isEmpty = bool;
	}
});
