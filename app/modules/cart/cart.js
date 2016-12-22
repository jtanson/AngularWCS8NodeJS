angular.module('angularWCS8.cart', [])

.controller('cartController', function($scope, $http, $location, $window, user, localStorageService) {
	console.log(localStorageService.get('orderId'));
	$http({
		method: 'GET',
		url: 'https://jtwcs8/wcs/resources/store/11451/cart/@self',
		headers: user.getHeaders()
  	}).then(function successCallback(response) {				
		console.log('get cart successful');
		console.log(response.data);
		$scope.order = response.data;
		$scope.orderItems = response.data.orderItem;
	}, function errorCallback(response) { 				
		console.log('get cart failed');
		console.log(response.data);
	});
	$scope.updateQty= function(item) {
		var dataObj = '{"orderItem": [{"orderItemId": "'+item.orderItemId+'", "quantity": "'+item.quantity+'"}],"orderId": "'+localStorageService.get('orderId')+'"}';
		$http({
			method: 'PUT',
			url: 'https://jtwcs8/wcs/resources/store/11451/cart/@self/update_order_item',
			headers: user.getHeaders(),
			data: dataObj
	  	}).then(function successCallback(response) {				
			console.log('update cart successful');
			console.log(response.data);
			$scope.order = response.data;
			$window.location.reload();
		}, function errorCallback(response) { 				
			console.log('update cart failed');
			console.log(response.data);
		});
	}
	$scope.backToShop= function(product) {
		$location.path('/shop');
	}
});
	
	