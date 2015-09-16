var koa = require('koa');
var router = require('./routes/router');
var views = require('koa-views');
var serve = require('koa-static');
var logger = require('koa-logger');
var bodyParser = require('koa-bodyparser');

var app = koa();

app.use(bodyParser({
  detectJSON: function (ctx) {
  return /\.json$/i.test(ctx.path);
  }
}));

app.use(views('src', {
  default: 'html'
}));

app.use(serve(__dirname + '/src'));

app.use(logger());

app.use(router(app));

var port;
if (process.env.NODE_ENV == 'production'){
  port = 80;
} else {
  port = 3000;
}
app.listen(process.env.PORT || port);
console.log('listening on ', port)
