const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');




const DB = process.env.DATABASE.replace('' +
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
  useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify: false
}).then(con=>{
  console.log(con.connections);
  console.log('DB connection succesfull');
});











const port = process.env.PORT || 3000;

app.listen(port,'127.0.0.1',()=>{
  console.log(Object.keys(require('./package.json').dependencies));
  console.log(`App running on port ${port}...`);
});