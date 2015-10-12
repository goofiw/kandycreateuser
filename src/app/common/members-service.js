angular.module('notify')
.factory('MemberService', [function(){
  var members = [];
  return {
    addMembers: function(newMembers){
      members.concat(newMembers);
    },
    getMembers: function() {
      return members;
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