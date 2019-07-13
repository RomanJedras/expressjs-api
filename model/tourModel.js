const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true,'A tour must have a name'],
    unique: true },
  rating: {
    type: Number,
    default: 4.5
  },
  price: {
    type: Number,
    required: [true,'A tour must have a price']
  },
  created_at: Date,
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

//model based on tourSchema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;