angular.module('notify')
.directive('fileupload', [function() {
  return {
    restrict: 'A',
    scope: {
      model: '=',
      done: '='
    },
    link: function(scope, el, attrs) {
      var optionsObj = {
        dataType: 'json'
      };

      el.change(handleFileSelect);


      function handleFileSelect(evt) {
        var file = evt.target.files[0];
     
        Papa.parse(file, {
          header: true,
          dynamicTyping: true,
          complete: function(results) {
            console.log(results);
            scope.model.members = results.data;
            console.log(scope);
            scope.done(results.data);
            scope.$apply();;
            data = results;
          }
        });
      }
    },
  };
}]);


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
