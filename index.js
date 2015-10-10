var koa = require('koa');
var router = require('./routes/router');
var views = require('koa-views');
var serve = require('koa-static');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');
var mongoose = require('mongoose');
var cors = require('koa-cors');

var app = koa();

app.use(bodyParser({
  detectJSON: function (ctx) {
  return /\.json$/i.test(ctx.path);
  }
}));

app.use(cors());

app.use(views('views', {
  default: 'html'
}));

app.use(serve(__dirname + '/src'));

app.use(logger());

app.use(router(app));

var port;
if (process.env.NODE_ENV == 'production'){
  port = 8080;
} else {
  port = 8080;
}
app.listen(process.env.PORT || port);
console.log('listening on ', port)
