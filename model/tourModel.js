const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true,'A tour must have a name'],
    unique: true,
    trim: true
  },
  duration: {
    type: Number,
    required: [true,'A tour must have a duration']
  },
  maxGroupSize: {
    type: Number,
    required: [true,'A tour must have a group size']
  },
  difficulty: {
    type: String,
    required: [true,'A tour must have a difficulty']
  },
  ratingAverage: {
    type: Number,
    default: 4.5
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true,'A tour must have a price']
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true,'A tour must have a summary']
  },
  description: {
   type: String,
    trim: true
  },
  imageCover: {
    type: String,
    required: [true,'A tour must have a iamge cover']
  },
  images: [String],
  created_at: {
    type: Date,
    default: Date.now()
  },
  startDates: [Date],
  updated_at: Date
});

//Mongoose schema method
tourSchema.methods.manify = function(next) {
  this.name = this.name + '-tour';
  
  return next(null, this.name);
};

tourSchema.pre('save', function(next) {
  //pobranie aktualnego czasu
  const currentDate = new Date();
  
  //zmiana pola na aktualny czas
  this.updated_at = currentDate;
  
  if (!this.created_at)
    this.created_at = currentDate;
  
  next();
});

tourSchema.pre('update', function(next) {
  //pobranie aktualnego czasu
  const currentDate = new Date();
  
  //zmiana pola na aktualny czas
  this.updated_at = currentDate;
  
  if (!this.created_at)
    this.created_at = currentDate;
  
  next();
});


//model based on tourSchema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;