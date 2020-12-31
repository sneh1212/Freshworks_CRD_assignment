//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");


const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect('mongodb://localhost:27017/crdDB', {useNewUrlParser: true,useUnifiedTopology: true } );

const schema= new mongoose.Schema({

  cname:String,
  ccap:String,
  Region:String,
  Language:String
});

const User = new mongoose.model("user",schema);
app.get("/",function(req,res) {

  res.render("index");

});
app.get("/create",function(req,res) {

  res.render("create");

});

app.get("/Delete",function(req,res){

res.render("Delete");

});
app.post("/Delete",function(req,res){
  console.log(req.body);
  User.deleteOne({cname:(""+req.body.cn)},function(err){
    if(!err)
    console.log("Deleted");
  });

  res.redirect("/");
});

app.get("/show",function(req,res){

User.find({},function(err,users)
{
  res.json({Data:users});
});

});

app.post("/create",function(req,res){

const user=new User({

  cname:req.body.cname,
  ccap:req.body.capital,
  Region:req.body.region,
  Language:req.body.language
});
user.save();

res.redirect("/show");

});











app.listen(5000,function(){

console.log("server running on 5000 port")
});
