var express = require('express');
var session = require('express-session');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config');
var mongoose = require('mongoose');
require('./models/template/mongodb')(config,mongoose);
var routes = require('./routes/index');
var app = express();

// view engine setup
app.set('views', config.views_dir);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(config.public_dir));
app.use(session({
  resave:false,
  saveUninitialized:false,
  secret: 'bangbang'
}))
//app.dynamicHelpers
app.use(function(req, res, next){
  res.locals.user = req.session.user;
  next();
});
app.use('/', routes);
app.set('port', config.port);
var server=http.createServer(app);
server.listen(config.port, function(){
  console.log("Express server listening on port " + config.port);
});
module.exports = app;
