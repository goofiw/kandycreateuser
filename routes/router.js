'use strict'
var users = require('../controllers/users.js');
var router = require('koa-router')();

  router.get('/api/login', users.auth, users.allmembers);

  router.post('/api/addmembers', users.auth, users.addMembers);

  router.post('/api/addmember', function *(next){
    //accepts one member
  }),

  router.post('/api/notify', users.notify);


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