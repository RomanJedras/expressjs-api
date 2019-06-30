const fs = require('fs');


let path = `${__dirname}/../dev-data/data/users-simple.json`;
console.log(path);
const users = JSON.parse(fs.readFileSync(path));


//2.2 Users

exports.getAllUsers =  (req,res)=> {
  
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: { users  }
  });
}

exports.getUser  = (req,res)=>{
  const id = req.params.id;
  const user  = users.find(el => el.id === id )
  if (! user) return res.status(404).json({
    status: 'fail',
    messages: 'Invalid id umber'
  });
  
  res.status(200).json({
    status: 'success',
    data: { user }
  });
}

exports.CreateUser = (req,res)=>{
  
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({id: newId},req.body);
  tours.push(newUser);
  fs.writeFile(path ,JSON.stringify(users),err=>{
    res.status(201).json({
      status: 'success',
      data: { tour: newUser }
      
    })
    if (err) return console.log(err.message())
  });
  console.log(newUser);
}

exports.UpdateUser = (req,res)=>{
  if(req.params.id * 1  > tours.length) return res.status(404).json({
    status: 'fail',
    messages: 'Invalid id umber'
  });
  const id = req.params.id * 1;
  const user  = users.find(el => el.id === id)
  
  //user. = req.body.duration ? req.body.duration : 15;
  
  res.status(201).json({
    status: 'success',
    data: { tour: user }
  })
  
  console.log(user);
}

exports.DeleteUser = (req,res)=>{
  if(req.params.id * 1  > users.length) return res.status(404).json({
    status: 'fail',
    messages: 'Invalid id umber'
  });
  
  res.status(201).json({
    status: 'success',
    data: null
  })
}