
/**
 * AngularJS Web Application
 */
var app = angular.module('WebApp', ['ngRoute','ngResource']);

/**
 * Configure the Routes
 */
app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    // Home
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    // Pages
    .when("/about", {templateUrl: "partials/about.html"})
    .when("/detail/:id", {templateUrl: "partials/detail.html", controller: "DetailCtrl"})
	.when("/contact", {templateUrl: "partials/contact.html"})
    .otherwise({
       redirectTo: "/"
     });
}]);


app.factory("ShotsInit", function($resource) {
	var api = $resource("http://api.dribbble.com/shots/popular",
    { callback: "JSON_CALLBACK" },
    { get: { method: "JSONP" }});
	
	return api;
});

app.factory("ShotDetail", function($resource) {
	var api = $resource("http://api.dribbble.com/shots/:id",
    { callback: "JSON_CALLBACK" },
    { get: { method: "JSONP" }});
	
	return api;
});


/**
 * Controls all other Pages
 */
app.controller('PageCtrl', function ($scope, $location, $http, ShotsInit) {
  console.log("Page Controller reporting.");
  
   ShotsInit.get(function(data) {
    $scope.shots = data;
	console.log($scope.shots);
  });
  
  $scope.showDetail = function(idShot) {
		console.log(idShot);
		$location.path("/detail/"+idShot);
	}
  
});

app.controller('DetailCtrl', function ($scope, $location, $http, $route, ShotDetail) {
  console.log("Detail Controller reporting.");

  ShotDetail.get({ id: $route.current.params.id }, function (data) {
      $scope.shot = data;
    });
});