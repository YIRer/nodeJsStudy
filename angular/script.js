(function(){
  var app = angular.module('todo',[]);

  app.controller('TodoCtrl',['$scope',function($scope){

    $scope.todo={
      title:'앵귤러',
       completed : false,
       createdAt : Date.now()
    }
  }]);

})();
