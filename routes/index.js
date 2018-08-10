var express = require('express');
var passport = require('passport');
var users = require('../models/user')
var router = express.Router();

router.get('/', function (req, res) {
    res.render('layout');
});

//CREATING AUTH ROUTES FOR REGISTRATION

router.get('/register',function(req,res){
    console.log('register page opened');
    res.render('register');
});

router.post('/register',function(req,res){
    console.log('register page submitted');
    var username = new users({username:req.body.username});
    users.register(username, req.body.password, function(err,user){
        if(err){
            console.log(err);
            res.redirect('/register');
        }
        passport.authenticate("local")(req,res,function(){
            res.redirect('/login');
        });
    });
});

//CREATING AUTH ROUTES FOR LOGIN

router.get("/login",function(req,res){
    console.log('login page opened');
    res.render('login');
});

router.post('/login',passport.authenticate("local",{
        successRedirect: "/campground",
        failureRedirect: "/login"
    }),function(req,res){
        console.log('login page submitted');
});

//LOGOUT LOGIC

router.get("/logout",function(req,res){
    req.logout();
    console.log('login page opened');
    res.render('login');
});

module.exports = router;



