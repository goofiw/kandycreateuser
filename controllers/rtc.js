'use strict'
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/rtcspeeddating');
var co = require('co');
var request = require('koa-request');

var kandy = require('../modules/kandy.js');

var users = wrap(db.get('users'));

co(function * () {
  var users = yield users.find({});
});

function *projectToken(next) {
  this.body = yield kandy.getProjectToken();
}

function *createKandyUser(next) {
  var user = {
    id: 'test'
  }
  var options = {
    method: 'POST',
    url: "https://api.kandy.io/v1.2/domains/users/user_id?key=" + process.env.PROJECT_ACCESS_TOKEN,
    body: {
      user_id:user.id,
      user_country_code:'+1'//for usa
    },
    json: true
  }
  var kandiUserInfo = yield request(options)
  kandiUserInfo = kandiUserInfo.body;
  console.log(kandiUserInfo);
  yield kandiUserInfo;
}

module.exports = {
  projectToken,
  createKandyUser
}