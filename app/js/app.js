var app = angular.module("angularWCS8", [
   'ngRoute',
   'LocalStorageModule',
   'angularWCS8.services',
   'angularWCS8.login',
   'angularWCS8.shop',
   'angularWCS8.cart'
]);

app.config(function($routeProvider) {
	$routeProvider
		.when('/login', {
			templateUrl : 'modules/login/login.html'
		})
		.when('/shop', {
		 	templateUrl: 'modules/shop/shop.html'
		})
		.when('/cart', {
		 	templateUrl: 'modules/cart/cart.html'
		})
    	.otherwise({redirectTo: '/login'});
});