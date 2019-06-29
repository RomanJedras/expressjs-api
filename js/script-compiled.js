'use strict';

var fs = require('fs');
var express = require('express');
var morgan = require('morgan');

var app = express();
app.use(express.json());

// 1) MIDDLEWARES

app.use(morgan('dev'));

app.use(function (req, res, next) {
  console.log('Hello from the middleware 👋');
  next();
});

app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});

var tours = JSON.parse(fs.readFileSync(__dirname + '/dev-data/data/tours-simple.json'));

//2 ROUTE HANDLERS

var getAllTour = function getAllTour(req, res) {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours: tours }
  });
};

var getTour = function getTour(req, res) {

  var id = req.params.id * 1;
  var tour = tours.find(function (el) {
    return el.id === id;
  });

  if (!tour) return res.status(404).json({
    status: 'fail',
    messages: 'Invalid id umber'
  });

  res.status(200).json({
    status: 'success',
    data: { tour: tour }
  });
};

var CreateTour = function CreateTour(req, res) {

  var newId = tours[tours.length - 1].id + 1;
  var newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(__dirname + '/dev-data/data/tours-simple.json', JSON.stringify(tours), function (err) {
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }

    });
    if (err) return console.log(err.message());
  });
  console.log(newTour);
};

var UpdateTour = function UpdateTour(req, res) {
  if (req.params.id * 1 > tours.length) return res.status(404).json({
    status: 'fail',
    messages: 'Invalid id umber'
  });
  var id = req.params.id * 1;
  var tour = tours.find(function (el) {
    return el.id === id;
  });

  tour.duration = req.body.duration ? req.body.duration : 15;

  res.status(201).json({
    status: 'success',
    data: { tour: tour }
  });

  console.log(tour);
};

var DeleteTour = function DeleteTour(req, res) {
  if (req.params.id * 1 > tours.length) return res.status(404).json({
    status: 'fail',
    messages: 'Invalid id umber'
  });

  res.status(201).json({
    status: 'success',
    data: null
  });
};

//app.get('/api/v1/tours',getAllTour);

//app.get('/api/v1/tours/:id',getTour);

//app.post('/api/v1/tours',CreateTour);

//app.patch('/api/v1/tours/:id',UpdateTour);

//app.delete('/api/v1/tours/:id',DeleteTour);

//3 ROUTE

app.route('/api/v1/tours').get(getAllTour).post(CreateTour);

app.route('/api/v1/tours/:id').get(getTour).patch(UpdateTour).delete(DeleteTour);

//4 SERVER
app.listen('3000', '127.0.0.1', function () {
  console.log('Listen server on port 3000');
});
