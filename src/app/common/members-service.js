angular.module('notify')
.factory('MemberService', ['$http', '$resource', function($http, $resource){
  var members = [];
  return {
    addMembers: function(newMembers){
      console.log(newMembers);
      $http.post('/api/addmembers', 
        {data:newMembers}
        );

    },
    getMembers: function() {
      console.log('getting members');
      $http.get('/api/members')
      .success(function(data){
        console.log(data);
      })
      .error(function(err){
        console.log(err);
      })
    },
    addMember: function(member){
      //add member
    },
    removeMember: function(member) {

    },
    updateMeber: function(member) {

    }
  }
}])