const express = require('express');
const morgan = require('morgan');
const tourRoute = require('./routers/tourRoute');
const userRoute = require('./routers/userRoute');



const app = express();
app.use(express.json());

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use(express.static(`${__dirname}/public`));


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours',tourRoute);
app.use('/api/v1/users',userRoute);

//4 SERVER
module.exports = app;