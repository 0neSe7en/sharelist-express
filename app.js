/// <reference path="typings/node/node.d.ts"/>
/// <reference path="typings/express/express.d.ts" />
/// <reference path="typings/angularjs/angular.d.ts" />
/// <reference path="typings/mongoose/mongoose.d.ts" />

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var onFinished = require('on-finished');
var http = require('http');
//var debug = require('debug')('app:' + process.pid);

var mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.connect('mongodb://localhost/sharelist');
mongoose.connection.on('error', function(){
  console.log("Mongoose connection error [from console]");
});
mongoose.connection.once('open', function(){
  console.log("Mongoose connected to the database [from console]");
});

// route
var users = require('./routes/users');
var lists = require('./routes/lists');
var auth = require('./routes/auth');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next){
  onFinished(res, function(err){
    console.log("[%s] finished request", req.connection.remoteAddress);
  });
  next();
});

app.use('/auth/', auth);
app.use('/api/users', users);
app.use('/api/lists', lists);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


module.exports = app;
