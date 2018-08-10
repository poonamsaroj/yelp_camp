var express = require('express');
var campground = require('../models/campground');
var comments = require('../models/comment');
var router = express.Router({ mergeParams: true });
//ROUTE IN ROOT DIRECTORY



//ROUTE IF PERSON TRIES TO ACCESS ALL CAMPGROUNDS

router.get('/', isLoggedIn, function (req, res) {
    // console.log(req.user);
    campground.find({},function(err, allCampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render('campgrounds/campground',{arrVal:allCampgrounds,currentUser:req.user});
        }
    });
});

//ROUTE IF PERSON TRIES TO SUBMIT IMAGE NAME AND URL OF THE IMAGE

router.post('/',isLoggedIn, function (req, res) {
    //console.log('inside');
    var nameVal = req.body.value;
    var urlVal = req.body.url;
    //console.log(nameVal + urlVal);
    //res.send(nameVal + urlVal);
    // array.push({
    //             name: nameVal,
    //             url: urlVal
    //         });
    var dataArr = {name: nameVal, url: urlVal};
    campground.create(dataArr, function(err, newlycreate){
        if(err){
            // console.log('inside error here');
            console.log(err);
        }else{
            // console.log('inside else here');
            res.redirect('campground');
        }
    });
});

//ROUTE IF PERSON TRIES TO ACCESS NEW PAGE

router.get('/new',isLoggedIn, function (req, res) {
    res.render('campgrounds/new');
});

//ROUTE IF PERSON TRIES TO SEE MORE ABOUT CAMPGROUNDS

router.get('/:id',isLoggedIn, function (req, res) {
    var id = req.params.id;
    // res.send(_id);
    campground.findById(id).populate("comments").exec(function(err, selectedids){
        if(err){
            console.log(err);
        }else{
            // console.log(id);
            // console.log(selectedids);
            res.render('campgrounds/detailed',{selectedid: selectedids});
        }
    });
});

//ISLOGGEDIN MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

module.exports = router;








