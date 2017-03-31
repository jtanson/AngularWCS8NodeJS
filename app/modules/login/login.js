angular.module('angularWCS8.login', [])

.controller('loginController', function($scope, $http, $location, user) {
	
	$scope.shopAsGuest= function() {
		$http({
    		method: 'POST',
    		url: settings.wcs_url + '/guestidentity'
      	}).then(function successCallback(response) {				
			console.log('get guestidentity successful');
			console.log(response.data);
			user.setUserTokens(response.data.WCToken, response.data.WCTrustedToken);
			$location.path('/shop');
    	}, function errorCallback(response) { 				
			console.log('get guestidentity failed');
			console.log(response.data);
    	});
	};
	$scope.loginUser= function() {
		console.log($scope.formParams);
		$http({
    		method: 'POST',
    		url: settings.wcs_url + '/loginidentity',
    		data: $scope.formParams
      	}).then(function successCallback(response) {  				
			console.log('post loginidentity successful');
			console.log(response.data);
			user.setUserTokens(response.data.WCToken, response.data.WCTrustedToken);
			$location.path('/shop');
    	}, function errorCallback(response) { 				
			console.log('post loginidentity failed');
			console.log(response.data);
    	});
	};
});