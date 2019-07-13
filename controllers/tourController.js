const Tour = require('../model/tourModel');






exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};


exports.getAllTour = (req,res)=> {
  console.log(req.requestTime)
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: { tours }
  });
}

exports.getTour  = (req,res)=>{
  
  const id = req.params.id * 1;
  const tour  = tours.find(el => el.id === id)
  
  // if (! tour) return res.status(404).json({
  //   status: 'fail',
  //   messages: 'Invalid id umber'
  // });
  //
  // res.status(200).json({
  //   status: 'success',
  //   data: { tour }
  // });
}

exports.CreateTour = (req,res)=>{
  res.status(201).json({
    status: 'success'
  });
}

exports.UpdateTour = (req,res)=>{
  const id = req.params.id * 1;
  // const tour  = tours.find(el => el.id === id)
  //
  // tour.duration = req.body.duration ? req.body.duration : 15;
  
  res.status(201).json({
    status: 'success',
    // data: { tour: tour }
  })
  
 
}

exports.DeleteTour = (req,res)=>{
  res.status(201).json({
    status: 'success',
    data: null
  })
}