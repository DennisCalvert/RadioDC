var app = angular.module("RadioApp", []);

app.controller("RadioCtrl", ['$scope', 'RadioService', function($scope, RadioService){
	$scope.greeting = "hola";
	RadioService.get().then(function(data){
		console.log(data);
		$scope.fma = data;
	})
}]);

app.factory("RadioService", function($http){
	return {
		get: function(){
			return $http.get('http://denniscalvert.azurewebsites.net/api/fma/')
				.then(function(data){
					return data;
				});
		}
	}
})