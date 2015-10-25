'use strict'
var rtc = require('../controllers/rtc.js');
var router = require('koa-router')();

  router.get('/api/getprojecttoken', rtc.projectToken);

  router.get('/api/createkandyuser', rtc.createKandyUser);



  router.get('/', function *(next) {
    yield this.render('index'); 
  }),

module.exports = router.routes();