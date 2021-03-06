angular.module('angularWCS8.shop', [])

.controller('shopController', function($scope, $http, $location, localStorageService, user, cart) {
	$http({
		method: 'GET',
		url: settings.wcs_search_url + '/productview/byCategory/10044'
  	}).then(function successCallback(response) {				
		console.log('get products by category successful');
		console.log(response.data.catalogEntryView);
		$scope.productsInCateogry = response.data.catalogEntryView;
	}, function errorCallback(response) { 				
		console.log('get products by category failed');
		console.log(response);
	});
	$scope.addToCart= function(product) {
		var dataObj = '{"orderItem": [{"quantity": "1","productId": "'+product.singleSKUCatalogEntryID+'"}]}';
		//var headerObj = JSON.parse('{"wctoken": "'+user.getUserToken()+'", "wctrustedtoken": "'+user.getUserTrustedToken()+'"}');
		$http({
			method: 'POST',
			url: settings.wcs_url + '/cart',
			headers: user.getHeaders(),
			data: dataObj
	  	}).then(function successCallback(response) {				
			console.log('add to cart successful');
			console.log(response.data);
			localStorageService.set('orderId',response.data.orderId);
			$location.path('/cart');
		}, function errorCallback(response) { 				
			console.log('add to cart failed');
			console.log(response.data);
		});
	};
	$scope.expandProduct= function(product) {
		$http({
			method: 'GET',
			url: product.resourceId
	  	}).then(function successCallback(response) {				
			console.log('expand product resource info successful');
			$scope.selectedProduct = response.data.catalogEntryView[0];
			$scope.selectedProductPrices = response.data.catalogEntryView[0].price;
			console.log($scope.selectedProduct);
		}, function errorCallback(response) { 				
			console.log('expand product resource info failed');
			console.log(response.data);
		});
	};
	$scope.viewCart= function(product) {
		$location.path('/cart');
	};
	$scope.isCartEmpty = cart.getCartEmptyFlag();
});
	
	