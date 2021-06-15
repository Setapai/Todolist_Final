// imports
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _= require('lodash');
const app =  express();
// modules
const listModel = require('./models/list');

// useSet
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

// route
app.get("/",  async (req,res) =>  {
  try {
    let title = req.originalUrl === "/" ? "Todolist"  : req.originalUrl;
    let list = await listModel.findList(title);

    res.render("index",{  title: title,  list:list ,  link: req.originalUrl});
  } catch (e) {
    console.log(e);
  }
});
app.post("/", async  (req,res)  =>{
  try {
    let title = req.originalUrl === "/" ? "Todolist"  : req.originalUrl;
    if (req.body.list) {
      await listModel.addList(req.body.list,  title, _.kebabCase(req.originalUrl));
    }else{
      await listModel.deleteList(title,  req.body.cbox);
    }
    res.redirect(req.originalUrl);
  } catch (e) {
    console.log(e);
  }
});

app.get("/:newList", async  (req,res)=>{
  try {
    let title = req.originalUrl === "/" ? "Todolist"  : req.params.newList;
    let list = await listModel.findList(title);
    res.render("index",{  title: req.params.newList,  list:list,  link: req.originalUrl });
  } catch (e) {
    console.log(e);
  }
});

app.post("/:newList", async  (req,res)  =>{
  try {
    if (req.body.list) {
      let title = req.originalUrl === "/" ? "Todolist"  : req.params.newList;
      await listModel.addList(req.body.list, title, _.kebabCase(req.params.newList));
    }else{
      await listModel.deleteList(req.params.newList,  req.body.cbox);
    }
    res.redirect(req.originalUrl);
  } catch (e) {
    console.log(e);
  }
});

app.listen(3000,(err)=>err? console.log(err): console.log("running at server 3000") );
