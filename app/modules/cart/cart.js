angular.module('angularWCS8.cart', [])

.controller('cartController', function($scope, $http, $location, $window, localStorageService, user, cart) {
	console.log('orderId: ' + localStorageService.get('orderId'));
	$scope.getCart = function () {
		$http({
			method: 'GET',
			url: 'https://jtwcs8/wcs/resources/store/11451/cart/@self',
			headers: user.getHeaders()
	  	}).then(function successCallback(response) {				
			console.log('get cart successful');
			console.log(response.data);
			$scope.order = response.data;
			if (response.data.recordSetTotal == '0') {
				cart.setCartEmptyFlag(true);
			}
			else {
				cart.setCartEmptyFlag(false);
			}
			$scope.orderItems = response.data.orderItem;
		}, function errorCallback(response) { 				
			console.log('get cart failed');
			console.log(response.data);
		});
	};
	$scope.getCart();
	$scope.isCartEmpty = cart.getCartEmptyFlag();
	$scope.backToShop= function(product) {
		$location.path('/shop');
	};
	$scope.updateQty = function(item) {
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
			//$window.location.reload();
			$scope.getCart();
		}, function errorCallback(response) { 				
			console.log('update cart failed');
			console.log(response.data);
		});
	};
	$scope.preCheckout = function() {
		var dataObj = '{"orderId": "'+localStorageService.get('orderId')+'"}';
		$http({
			method: 'PUT',
			url: 'https://jtwcs8:443/wcs/resources/store/11451/cart/@self/precheckout',
			headers: user.getHeaders(),
			data: dataObj
	  	}).then(function successCallback(response) {				
			console.log('precheckout successful');
			console.log(response.data);
			$scope.checkout();
		}, function errorCallback(response) { 				
			console.log('precheckout failed');
			console.log(response.data);
		});
	};
	$scope.checkout = function() {
		console.log('then call checkout here');
		/*var dataObj = '{"orderId": "'+localStorageService.get('orderId')+'"}';
		$http({
			method: 'POST',
			url: 'https://jtwcs8:443/wcs/resources/store/11451/cart/@self/checkout',
			headers: user.getHeaders(),
			data: dataObj
	  	}).then(function successCallback(response) {				
			console.log('checkout successful');
			console.log(response.data);
		}, function errorCallback(response) { 				
			console.log('checkout failed');
			console.log(response.data);
		});*/
	};
});
	
	