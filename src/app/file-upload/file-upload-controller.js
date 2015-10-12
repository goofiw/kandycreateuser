angular.module('notify')
.controller('UploadCtrl', function($scope, $resource) {
  $scope.getUrl = function() {
    console.log('fetching url from amazon');
    return $resource('/api/awsurl');
  }  

  $scope.uploadFinished = function(e, data) {
    console.log('finished uploading');
  }
});
