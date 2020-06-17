var express=require("express");
var bodyParser=require("body-parser");

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/pranams');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
console.log("connection succeeded");
})


var app=express()


app.use(bodyParser.json());
app.use(express.static('Pranams'));
app.use(bodyParser.urlencoded({
extended: true
}));

app.post('/form/signup', function(req,res){
    var Username = req.body.Username;
    var Email =req.body.Email;
    var Password = req.body.Password;
    var CPassword=req.body.CPassword;
    var Phonenumber=req.body.Phonenumber;

    var data = {
        "Username": Username,
        "Email":Email,
        "Password":Password,
        "CPassword":CPassword,
        "Phonenumber":Phonenumber

    }
    db.collection('signup').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");

});

return res.redirect('/form/login.html');
})
app.get('/form/login',function(req,res,next){
    return res.render('/form/login.html');

});
app.post('/form/login', function(req,res,next){
    db.collection('signup').findOne({Username:req.body.Username},
        function(err,data){
            if(data){
                if(data.Password==req.body.Password){
                   // req.session.userId=data.unique_id;
                    return res.redirect('/index.html');
                }
                else{
                    res.send({"Success":"Wrong password !"});
                }
            }
                else{
                    res.send({"Success":"Username is incorrect"});
                }
                });
            });
//contact start
app.post('/index', function(req,res){
    var name = req.body.name;
    var email =req.body.email;
    var subject = req.body.subject;
    var message =req.body.message;

    var data = {
        "name": name,
        "email":email,
        "subject":subject,
        "message":message
            
    }
    db.collection('contact_us').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");
            
});
            
return res.redirect('/index.html');
})
//contact end

//feedback
app.post('/feedback/formpage', function(req,res){
    var experience = req.body.experience;
    var comments = req.body.comments;
    var name = req.body.name;
    var email =req.body.email;
    
    var data = {
        "experience": experience,
        "comments" : comments,
        "name": name,
        "email":email
            
    }
    db.collection('feedback').insertOne(data,function(err, collection){
if (err) throw err;
console.log("Record inserted Successfully");
            
});
            
return res.redirect('/index.html');
})
//feedback end
app.get('/index',function(req,res){
res.set({
'Access-control-Allow-Origin': '*'
});
return res.redirect('/index.html');
}).listen(3000)


console.log("server listening at port 3000");
