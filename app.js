var express=require("express");
var app=express();
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/TestSoftware",{useNewUrlParser:true});

//app.use(express.static(__dirname+"/public"));
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
app.set("view engine","ejs");

var studentSchema = mongoose.Schema({
    rollno: String,
    marksscored : Number,
    name : String
});

var Student = mongoose.model("Student",studentSchema);

// var data={
//     name:"Humaid",
//     rollno:"cs18059"
// }
// Student.create(data,function(err,Student){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Successfully created");
//     }
// })

app.get("/csclogin",function(req,res){
    res.render("csclogin");
});

app.get("/",function(req,res){
    res.render("index");
});

app.post("/cscchecklogin",function(req,res){
    var rollno = req.body.rollno;
    var name = req.body.name;
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
