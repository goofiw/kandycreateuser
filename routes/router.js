function route(app) {
  var router = require('koa-router')(app);

  router.get('/', function *(next) {
    yield this.render('index'); 
  })

  return router.routes();
}

module.exports = route;