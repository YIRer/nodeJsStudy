var myApp = angular.module('myApp', []);

myApp.controller('myCtrl', ['$scope', function ($scope) {
  $scope.submit = function (text, len) {
    console.log(text);
  	alert(text + ', ' + len);
  };
}]);

myApp.directive('textBox', function() {
  return {
    restrict: 'E',
    scope: {
    	onSubmit: "&"
    },
    template: '<input type="text" ng-model="value"/><button type="submit" ng-click="onSubmit({ text: value, len: value.length })">Submit!</button>'
  }
});
