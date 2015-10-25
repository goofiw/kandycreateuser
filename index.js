var koa = require('koa');
var router = require('./routes/router');
var views = require('koa-views');
var serve = require('koa-static');
var logger = require('koa-logger');
var koaBody = require('koa-body-parser');
var cors = require('koa-cors');
require('dotenv').load();

var app = koa();

app.use(koaBody());
app.use(cors());

app.use(views('views', {
  default: 'html'
}));

app.use(serve(__dirname + '/src'));

app.use(logger());


app.use(router);


var port;
if (process.env.NODE_ENV == 'production'){
  port = 8080;
} else {
  port = 8080;
}
app.listen(process.env.PORT || port);
console.log('listening on ', port)
