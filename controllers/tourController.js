const fs = require('fs');


let path = `${__dirname}/../dev-data/data/tours-simple.json`;

const tours = JSON.parse(fs.readFileSync(path));


exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

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
    results: tours.length,
    data: { tours }
  });
}

exports.getTour  = (req,res)=>{
  
  const id = req.params.id * 1;
  const tour  = tours.find(el => el.id === id)
  
  if (! tour) return res.status(404).json({
    status: 'fail',
    messages: 'Invalid id umber'
  });
  
  res.status(200).json({
    status: 'success',
    data: { tour }
  });
}

exports.CreateTour = (req,res)=>{
  
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({id: newId},req.body);
  tours.push(newTour);
  fs.writeFile(path ,JSON.stringify(tours),err=>{
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
      
    })
    if (err) return console.log(err.message)
  });
  console.log(newTour);
}

exports.UpdateTour = (req,res)=>{
  const id = req.params.id * 1;
  const tour  = tours.find(el => el.id === id)
  
  tour.duration = req.body.duration ? req.body.duration : 15;
  
  res.status(201).json({
    status: 'success',
    data: { tour: tour }
  })
  
  console.log(tour);
}

exports.DeleteTour = (req,res)=>{
  res.status(201).json({
    status: 'success',
    data: null
  })
}