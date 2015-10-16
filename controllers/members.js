'use strict'
var parse = require('co-body');
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/testNotify');
var co = require('co');

var mailer = require('../modules/mailer.js');

var members = wrap(db.get('members'));

co(function * () {
  var members = yield members.find({});
});

//validation
// members.index('email', {unique:true});

module.exports.allmembers = function *allmembers(next) {
  if ('GET' != this.method) return yield next;
  this.body = yield members.find({})
}
module.exports.addMembers = function *addMembers(next) {
  if ('POST' != this.method) return yield next;
  var newMembers = JSON.parse(this.body).data;
  for(let i = 0; i < newMembers.length; i++){
    add(members, newMembers[i]);
    // if (!inserted) {
    //   console.log(members[i], ' could not be added')
    // }
    // console.log(inserted, 'has been added');
  }
  this.body = yield members.find({});
}

module.exports.auth = function *auth(next) {
  console.log('One day, we will verify users are logged in');
  yield next;
}

module.exports.notify = function *notify(next) {
  if ('POST' != this.method) return yield next;
  var data = JSON.parse(this.body);
  console.log('\n\n\ndata',data);
  var notifyMember = yield members.findOne({_id: data.id})

  var mailOptions = {
      from: notifyMember.name + ' <goofiwmailer@gmail.com>', // sender address 
      to: notifyMember.name + ', ' + notifyMember.email + ', Associate <associate@startuphall.org>',// list of receivers 
      subject: data.visitorName + ' is waiting in the lobby', // Subject line 
      text: 'This is an automated message from the StartUp Hall Front desk. \n' + data.visitorName + ' has arrived and is waiting in the lobby \n\n\n\n Thank you, \n\n StartUp Hall Robots', // plaintext body 
  };
  mailer(mailOptions);
  console.log(notifyMember);
  this.body =  yield {member: notifyMember.name};
}

//helper functions

function add(members, member) {
  var newMember = {
    name: member.First + ' ' + member.Last,
    email: member.Email,
    company: member['Company/Org'],
    slack: member.Slack
  }
  console.log('adding', newMember);
  members.insert(newMember, function(err){
    console.log(err);
  });

}
