angular.module('tutorialCtrlModule',[])
.controller("tutorialCtrl",["$scope",function($scope){
  $scope.title  = "Yirer";
  $scope.subTitle = 'ssss';
  $scope.firstname ="firstname";
  $scope.lastname ="lastname";
  $scope.bindOutput = 2;
  $scope.timeTwo = function(){
    $scope.bindOutput *=2;
  };
}]).controller('tutorialCtrl2',["$scope", function($scope){
  $scope.tutorial2 = "this is tutorial2";
}]);
