const Tour = require('../model/tourModel');



exports.getAllTour = async (req,res)=> {
  
  try {
    
    const tours = await Tour.find();
  
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: { tours }
    });
  } catch(error) {
    res.status(400).json({
      'status':'fail',
      'messages': error  //On production should be Invalid data send
    });
  }
};

exports.getTour  = async (req,res)=>{
  
  try {
  const tour = await Tour.findById(req.params.id);
  //  Tour.findById({'_id': req.params.id)});
  
    res.status(200).json({
         status: 'success',
         data: { tour }
       });
  
  } catch (error) {
    res.status(400).json({
      'status':'fail',
      'messages': error  //On production should be Invalid data send
    });
  }
};

exports.CreateTour = async (req,res)=>{
  
  try {
    
    //const newTour = Tour.create({});
    //newTour.save();
    
    const newTour = await Tour.create(req.body);
  
    newTour.manify (function(err, name) {
      if (err) throw err;
      console.log('Twoja nowa nazwa to: ' + name);
    });
  
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
    
  } catch (error) {
   res.status(400).json({
     'status':'fail',
     'messages': error  //On production should be Invalid data send
   });
  }
};

exports.updateTour = async (req,res) => {
  
  try {
  
  const tour = await Tour.findByIdAndUpdate(req.params.id,{ $set: { price: req.body.price, updated_at: new Date() }}, {
       new: true,
       runValidators: true
    });
    
    
    res.status(201).json({
      status: 'success',
       data: {
        tour
      }
    })
  } catch(error) {
    res.status(400).json({
      'status':'fail',
      'messages': error  //On production should be Invalid data send
    });
  }
};

exports.DeleteTour = async (req,res)=>{
  
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    })
  }catch(error) {
    res.status(400).json({
      'status':'fail',
      'messages': error  //On production should be Invalid data send
    });
  }
  
};