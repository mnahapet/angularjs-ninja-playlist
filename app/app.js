var myNinjaApp = angular.module('myNinjaApp', ['ngRoute', 'ngAnimate']);

myNinjaApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true); // for pretty URL's without #
  // $locationProvider.hashPrefix(''); // this is neccesary for new version!!!
  $routeProvider
    .when('/home', {
      templateUrl: 'views/home.html',
      controller: 'NinjaController'
    })
    .when('/directory', {
      templateUrl: 'views/directory.html',
      controller: 'NinjaController'
    })
    .when('/contact', {
      templateUrl: 'views/contact.html',
      controller: 'ContactController'
    })
    .when('/contact/success', {
      templateUrl: 'views/contact-success.html',
      controller: 'ContactController'
    })
    .otherwise({
      redirectTo: '/home'
    });
}]);

myNinjaApp.directive('randomNinja', [ function(){
  return {
    restrict: 'E',
    scope: {
      ninjas: '=',
      title: '@'
    },
    templateUrl: 'views/random.html',
    transclude: true,
    replace: true,
    controller: function($scope) {
      console.log($scope);
      $scope.random = Math.floor(Math.random() * 6);
    }
  };
}]);

myNinjaApp.controller('NinjaController', ['$scope', '$http', function($scope, $http) {

  $scope.removeNinja = function(ninja) {
    let removeNinja = $scope.ninjas.indexOf(ninja);
    $scope.ninjas.splice(removeNinja, 1);
  };

  $scope.addNinja = function($event){
    $event.preventDefault();
    $scope.ninjas.push({
      name: $scope.newninja.name,
      belt: $scope.newninja.belt,
      rate: parseInt($scope.newninja.rate),
      available: true
    });

    $scope.newninja.name = "";
    $scope.newninja.belt = "";
    $scope.newninja.rate = "";
  };

  $scope.removeAll = function() {
    $scope.ninjas = [];
  }

  $http.get('data/ninjas.json')
    .then(res => {
      $scope.ninjas = res.data;
    })
    .catch(err => {
      console.log(err);
      throw new Error(err);
    });

  // $scope.ninjas = [
  //   {
  //     name: 'yoshi',
  //     belt: 'green',
  //     rate: 50,
  //     available: true,
  //     thumb: 'content/img/yoshi1.png'
  //   },
  //   {
  //     name: 'peach',
  //     belt: 'orange',
  //     rate: 40,
  //     available: true,
  //     thumb: 'content/img/peach2.png'
  //   },
  //   {
  //     name: 'luigi',
  //     belt: 'yellow',
  //     rate: 10,
  //     available: true,
  //     thumb: 'content/img/luigi1.png'
  //   },
  //   {
  //     name: 'mario',
  //     belt: 'black',
  //     rate: 1000,
  //     available: true,
  //     thumb: 'content/img/mario1.png'
  //   },
  //   {
  //     name: 'bowser',
  //     belt: 'blue',
  //     rate: 2000,
  //     available: true,
  //     thumb: 'content/img/bowser.png'
  //   },
  //   {
  //     name: 'toad',
  //     belt: 'lime',
  //     rate: 700,
  //     available: true,
  //     thumb: 'content/img/toad.png'
  //   } 
  // ];

  // console.log(angular.toJson($scope.ninjas));

}]);

myNinjaApp.controller('ContactController', ['$scope', '$location', function($scope, $location) {
    $scope.sendMessage = function() {
      $location.path('/contact/success');
    }  
}]);