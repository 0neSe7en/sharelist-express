var shareList = angular.module('shareList', []);

shareList.controller('registerCtrl', [
  '$scope', '$http',
  function ($scope, $http) {
    $scope.user = {};
    $scope.register = function () {
      console.log($scope.user);
      $http.post('/api/users', $scope.user).
          success(function(data){
            console.log("Success");
            console.log("data is", data);
          }).
          error(function(data, status){
            console.log("Error");
            console.log("data is", data);
            console.log("stauts:", status);
          })
    }
  }
]);

shareList.controller('loginCtrl', [
    '$scope', '$http',
    function ($scope, $http){
      $scope.user = {};
      $scope.login = function(){
        $http.post('/auth/login', $scope.user).
            success(function(data){
              console.log("Success", data);
            }).
            error(function(data, status){
              console.log("Error", data, status);
            })
      }
    }
]);