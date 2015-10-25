'use strict'
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/rtcspeeddating');
var co = require('co');
var request = require('koa-request');


var users = wrap(db.get('users'));

co(function *() {
  var users = yield users.find({});
});

function *getProjectToken(next) {
  console.log(process.env.PROJECT_API_KEY)
  var options = {
      url: 'https://api.kandy.io/v1.2/domains/accesstokens?key=' + process.env.PROJECT_API_KEY + '&domain_api_secret=' + process.env.PROJECT_API_SECRET,
  };

  var response = yield request(options); 
  var projectToken = JSON.parse(response.body);
  console.log(projectToken.result)
  this.body = projectToken;
}

module.exports = {
  getProjectToken
}