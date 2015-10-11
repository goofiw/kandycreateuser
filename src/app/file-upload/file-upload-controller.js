angular.module('notify')
.controller('UploadCtrl', function($scope, $resource) {
  $scope.getUrl = function() {
    console.log('fetching url from amazon');
    return $resource('/api/awsurl');
  }  
  $scope.handleFiles = function() {
    var fileList = this.files; /* now you can work with the file list */
    console.log(fileList);
  }
  $scope.uploadFinished = function(e, data) {
    console.log('finished uploading');
  }
});
