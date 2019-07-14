const express = require('express');
const tourController = require('../controllers/tourController');


const route = express.Router();

//route.param('id', tourController.checkID);


route.route('/').get(tourController.getAllTour).post(tourController.CreateTour);
route.route('/:id').get(tourController.getTour).patch(tourController.updateTour).delete(tourController.DeleteTour);



module.exports = route;