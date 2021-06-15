const mongoose = require('mongoose');

module.exports.dbConnection =  db;

function  db(dbname){
  let con = mongoose.connect("mongodb://localhost:27017/"+dbname,
  {  useUnifiedTopology:true, useNewUrlParser:true ,  useFindAndModify:false },
  (err)=> err? console.log(err)  : console.log(dbname  + " DB Connection Successfull"));
  return con;
}
