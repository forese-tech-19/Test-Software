var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var mongoose=require("mongoose");
// ---->
// var MongoClient = require('mongodb').MongoClient,
//   f = require('util').format,
//   assert = require('assert');

// var user = encodeURIComponent('humaid');
// var password = encodeURIComponent('abc123');
// var authMechanism = 'DEFAULT';

// // Connection URL
// var url = f('mongodb://localhost:27017/TestSoftware',
//   user, password, authMechanism);

// // Use connect method to connect to the Server
// MongoClient.connect(url, function(err, db) {
//   assert.equal(null, err);
//   console.log("Connected correctly to server");

//   db.close();
// });
// --->
mongoose.connect("mongodb://localhost:27017/TestSoftware",{useNewUrlParser:true});

//app.use(express.static(__dirname+"/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.set("view engine","ejs");

var studentSchema = mongoose.Schema({
    rollno: String,
    marksscored : String,
    name : String
});

var Student = mongoose.model("Student",studentSchema);

// var data={
//     name:"Hari",
//     rollno:"cs180501050",
//     marksscored:"0"

// }
// Student.create(data,function(err,Student){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully created");
//     }
// })
var rollno;
var name;
var marksscored;
app.post("/dispcscmarks",function(req,res){
    marksscored = req.body.marks;
    console.log(marksscored);
    // console.log(name);
    // console.log(rollno);
    Student.findOneAndUpdate({rollno:rollno},{marksscored:marksscored},function(err,student){
        if(err){
            console.log(err);
        }else{
            console.log("Updated in database");
        }
    })
})
app.get("/csclogin",function(req,res){
    res.render("csclogin");
});

app.get("/",function(req,res){
    res.render("index");
});

app.post("/cscchecklogin",function(req,res){
    rollno = req.body.rollno;
    name = req.body.name;
    Student.find({rollno:rollno,name:name},function(err,student){
        if(err){
            console.log(err);
        }else{
            res.render("demo",{Student:Student})
        }
    })
})

app.listen(3000,function(){
    console.log("Server has started");
});
