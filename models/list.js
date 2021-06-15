// Modules
const mongoose = require('mongoose');
const _ = require('lodash');
// Dbs
const con = require('../services/db');
con.dbConnection("todoList");
// Exports
module.exports.addList    =  _add;
module.exports.deleteList =  _delete;
module.exports.findList   =  _find;
// Schema
const listSchema = new mongoose.Schema({
  slug:   String,
  title:  String,
  list:   []
});
// Model
const ListModel = mongoose.model("list",  listSchema);
// DataTypes
// Callbacks
function _add(txtField,title,link ){
  if (txtField) {
  ListModel.findOneAndUpdate(
     {  title:  title  },
     {  $push : { list: txtField }, title:title  , slug:link},
     {  new:true, upsert:true },
     (err) => err?console.log(err): console.log("Added Successfully")  );

  }
};

function _delete(title,cBox){
  ListModel.findOneAndUpdate({  title:title  },
     {  $pull : { list: cBox }  },
     {  new:true, upsert:true },
     (err) => err?console.log(err): console.log(cBox+" Successfully")  );
};


async function _find (title){
    let listData = [];
    // Call List
    let getList = await ListModel.find({title:title}, (err,query)  => {
      return query;
    });
    // getList
    getList.forEach((item,index)=>{
      listData = item.list;
    });
    // Return List
    return listData;
};
