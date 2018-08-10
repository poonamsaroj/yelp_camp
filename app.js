var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var indexRoute = require('./routes/index');
var campgroundRoute = require('./routes/campground');
var commentRoute = require('./routes/comment');
var campground = require("./models/campground");
var comments = require('./models/comment');
var users = require("./models/user.js");
var passport = require("passport");
var passportLocal = require("passport-local");
var passportlocalmongoose = require("passport-local-mongoose");
var seedDB = require('./seed');
var app = express();
seedDB();

// MAKE A CONNECTION WITH MONGODB

mongoose.connect('mongodb://localhost/yelpcamp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(require('express-session')({
        secret: "Poonam Rocks",
        resave: false,
        saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(users.serializeUser());
passport.deserializeUser(users.deserializeUser());
passport.use(new passportLocal(users.authenticate()));
app.use(express.static(__dirname + '/public'));
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
});
app.use('/',indexRoute);
app.use('/campground',campgroundRoute);
app.use('/campground/:id/comments',commentRoute);

//THE LISTEN FUNCTION

app.listen(process.env.PORT, process.env.IP,function(){
    console.log('server started');
});







