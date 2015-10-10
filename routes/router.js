var mongoose = require('mongoose');

var upload = require('../modules/upload.js');


function route(app) {
  var router = require('koa-router')(app);
  var members = [
        {name: 'will', email: 'goofiw@gmail.com', slack: 'will', company: 'StartupHall'},
        {name: 'william', email: 'goofiwmailer@gmail.com', slack: 'william', company: 'StartupHall'},
        {name: 'Rob', email: 'Rob@candyjar.com', slack: 'Rob', company: 'Candy Jar'},
        {name: 'jeremy', email: 'jeremy@datablade.io', slack: 'jeremy', company: 'DataBlad'},
        ]

  router.get('/api/members', function *(next){
    yield this.body = members;
  })

  router.get('/api/awsurl', function *(next){
    yield this.body = {url: upload.getUrl()};
  })

  router.get('/', function *(next) {
    yield this.render('index'); 
  })


  return router.routes();
}

module.exports = route;