var koa = require('koa');
var router = require('./routes/router');
var views = require('koa-views');
var serve = require('koa-static');
var logger = require('koa-logger');
var koaBody = require('koa-body');
var cors = require('koa-cors');
var dotenv = require('dotenv').load();

var app = koa();

app.use(koaBody({formidable:{uploadDir: __dirname}}));
app.use(function *(next) {
  if (this.request.method == 'POST') {
    console.log(this.request.body);
    // => POST body
    this.body = JSON.stringify(this.request.body);
  }
  yield next;
});

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
