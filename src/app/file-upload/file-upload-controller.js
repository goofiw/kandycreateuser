angular.module('notify')
.controller('UploadCtrl', ['$scope', '$resource', 'MemberService', function($scope, $resource, MemberService) {
  $scope.getUrl = function() {
    console.log('fetching url from amazon');
    return $resource('/api/awsurl');
  }  

  $scope.addMembers = function(members) {
    MemberService.addMembers(members);
    console.log('finished uploading');
  }

  $scope.getAllMembers = function() {
    $scope.allMembers = MemberService.getMembers();
  }
}]);
