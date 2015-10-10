angular.module('notify')
.factory('AwsUrlService', function($resource){
  return {
    getUrl: function(){
      return $resource('/api/awsurl');
    }
  }
})