angular.module('notify.services')
.factory('FileService', function($resource){
  return {
    getUrl: function(){
      return $resource('/api/awsurl');
    }
  }
})