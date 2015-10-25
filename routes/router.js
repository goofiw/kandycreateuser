'use strict'
var auth = require('../controllers/auth.js');
var rtc = require('../controllers/rtc.js');
var router = require('koa-router')();


  router.post('/api/login', auth.login);

  router.post('/api/signup', auth.signup);

  router.get('/api/logout', auth.logout);

  router.get('/api/getprojecttoken', rtc.projectToken);

  router.get('/api/createkandyuser', rtc.createKandyUser);



  router.get('/', function *(next) {
    yield this.render('index'); 
  }),

module.exports = router.routes();