'use strict';

var express = require('express');
var morgan = require('morgan');
var tourRoute = require('./routers/tourRoute');
var userRoute = require('./routers/userRoute');

var app = express();
app.use(express.json());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(function (req, res, next) {
  console.log('Hello from the middleware 👋');
  next();
});

app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', tourRoute);
app.use('/api/v1/users', userRoute);

//4 SERVER
module.exports = app;
