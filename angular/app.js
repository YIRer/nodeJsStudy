var app = angular.module('app', []);

app.controller("homeController",["$scope",function($scope){
  $scope.appTitle = "GroceryList";
}]);

app.controller("GroceryListItemsController",["$scope",function($scope){
    $scope.groceryItems = [

      {complated : true, itemName: 'milk', date : '2017-03-01'},
      {complated : true, itemName: 'cookies', date : '2017-03-05'},
      {complated : true, itemName: 'ice Cream', date :'2017-03-02' },
      {complated : true, itemName: 'chocolate', date :'2017-03-11' },
      {complated : true, itemName: 'eggs', date :'2017-03-21' }
  ];
}]);
