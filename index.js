//install express
//cmd type - >node index 
//complete get method



var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');


/*************************************** */
var mongoose = require('mongoose');             //if you want to use the mlabs then we will have to 
mongoose.connect('mongodb://localhost/my_db',{ useNewUrlParser: true });  //change the url and the connection command here only

var fbSchema = mongoose.Schema({
    username : String,
    food : Number,
    cleanliness : Number,
    service : Number,
    atmosphere : Number,
    valueForMoney : Number,
    overall : Number,
    suggestion : String,
    date : Date     //i have a doubt here if it is the right way to declare date type variable
});

var FeedBack = mongoose.model("FeedBack",fbSchema);

// below code is to be used inside the request handler which 
//stores the feedback in the database



// below code is to be used inside the request handler to
//show all the feedbacks




/***************************************************** */
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'first.html'));

});

app.post('/feedback', (req, res) => {
    console.log("Received some request");
    console.log(req.body);
    var fb = req.body;

var newFeedBack = new FeedBack({
    username : fb.username,

    food : fb.food,
    cleanliness : fb.cleanliness,
    service : fb.service,
    atmosphere : fb.atmosphere,
    valueForMoney : fb.valueForMoney,
    overall : fb.overall,
    
    suggestion : fb.suggestion,
    date : new Date()
});

newFeedBack.save(function(err,FeedBack){
    if(err)
        res.render('show_message', {message: "Database error", type: "error"}); //need edit here in how to show the error page or message
    else
        res.render('all_feedback_page', {message: "New feedback added", type: "success"});  //need edit here
});
    
});


app.get('/feedback',(req,res)=>{
    //list of all the feedback
    //incomplete method return must add callback here.
    FeedBack.find((err,response)=>{
        if(err) throw err;
        res.json(response);
    });
})

app.listen(3000, () => {
    console.log("Server up at local host 3000");
})





/**********************************************************/
//database code for scratch card 

var apps = ["uber","ola","rapido","big bazaar","myntra","amazon","flipkart","snapdeal"];

var offerSchema = mongoose.Schema({
    username: String,
    offer: String
});

var offers = mongoose.model("offers",offerSchema);




var appBen = apps[Math.floor(Math.random()*100)%apps.length];
var ben = Math.floor(Math.random()*100)%50;

var temp = "You got " + ben + "% off on any purchase on "+appBen;

var temp2 = req.body;

var newOffer = new offers({
    username : temp2.username,
    offer : temp
});

newOffer.save(function(err,offers){
    if(err)
        res.render('show_message', {message: "Database error", type: "error"}); 
    else{
        var scratchCard = offer._id; //
        res.render('all_feedback_page', {message: "New Scratch card added", type: "success"});  

});

// plz edit the render statement as how will you send the resultant offer

/**************************************************************/

//database code for averages

//average food rating
FeedBack.aggregate([{$group :{_id : "$food",avgFoodRating : {$avg : 1}}}],function(err,result){
    if (err){
        //code to show error message
    }else{
        res.json(result);
    }
});

//average cleanliness rating
FeedBack.aggregate([{$group :{_id : "$cleanliness",avgCleanlinessRating : {$avg : 1}}}],function(err,result){
    if (err){
        //code to show error message
    }else{
        res.json(result);
    }
});

//average atmosphere rating
FeedBack.aggregate([{$group :{_id : "$atmoshphere",avgAtmosRating : {$avg : 1}}}],function(err,result){
    if (err){
        //code to show error message
    }else{
        res.json(result);
    }
});

//average service rating
FeedBack.aggregate([{$group :{_id : "$service",avgServiceRating : {$avg : 1}}}],function(err,result){
    if (err){
        //code to show error message
    }else{
        res.json(result);
    }
});

//average valueForMoney rating
FeedBack.aggregate([{$group :{_id : "$valueForMoney",avgVFMRating : {$avg : 1}}}],function(err,result){
    if (err){
        //code to show error message
    }else{
        res.json(result);
    }
});

//average overall rating
FeedBack.aggregate([{$group :{_id : "$overall",avgOverallRating : {$avg : 1}}}],function(err,result){
    if (err){
        //code to show error message
    }else{
        res.json(result);
    }
});
