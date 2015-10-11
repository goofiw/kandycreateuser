angular.module('notify')
.directive('fileupload', function() {
  return {
    restrict: 'A',
    scope: {
      done: '&',
      progress: '&'
    },
    link: function(scope, el, attrs) {
      var optionsObj = {
        dataType: 'json'
      };

      if(scope.done) {
        optionsObj.done = function(){
          scope.$apply(function(){
            scope.done({e: e, data: data});
          });
        };
      }

      if (scope.progress) {
        optionsObj.progress = function(e, data) {
          scope.$apply(function() {
            scope.progress({e: e, data: data});
          });
        }
      }

      el.fileupload(optionsObj);
    },
  };
});


//how to grab more obj out of directive
// var app = angular.module('app', []);

// app.controller('mainController', 
//                 [
//   '$scope', 
//   function($scope){
//     $scope.myObj = "Initial Value";
//   }
// ]);

// app.directive('dirName', [
//   function(){
//     return {
//       restrict : 'A',
//       scope : {
//         obj : "=ngModel"
//       },
//       link : function(scope, element, attrs){
//         scope.obj = attrs.newValue;
//       }
//     };
//   }
// ]);
