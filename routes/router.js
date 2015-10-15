'use strict'
var members = require('../controllers/members.js');
var router = require('koa-router')();

  router.get('/api/members', members.auth, members.allmembers);

  router.post('/api/addmembers', members.auth, members.addMembers);

  router.post('/api/addmember', function *(next){
    //accepts one member
  }),

  router.post('/api/notify', members.notify);


  router.post('/api/fileupload', function *(next) {
    console.log(this);
    yield this.body = {};
  }),


  router.get('/api/awsurl', function *(next){
    yield this.body = {url: upload.getUrl()};
  }),

  router.get('/', function *(next) {
    yield this.render('index'); 
  }),

module.exports = router.routes();