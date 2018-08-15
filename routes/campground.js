var express = require('express');
var methodOverride = require("method-override");
var campground = require('../models/campground');
var comments = require('../models/comment');
var router = express.Router({ mergeParams: true });

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

router.post('/', isLoggedIn, function (req, res) {
    //console.log('inside');
    var nameVal = req.body.value;
    var urlVal = req.body.url;
    //console.log(nameVal + urlVal);
    //res.send(nameVal + urlVal);
    // array.push({
    //             name: nameVal,
    //             url: urlVal
    //         });
    // console.log(req.user.username);
    var dataArr = {name: nameVal, url: urlVal};
    campground.create(dataArr, function(err, newlycreate){
        if(err){
            // console.log('inside error here');
            console.log(err);
        }else{
            // console.log('inside else here');
            newlycreate.author.id = req.user._id;
            newlycreate.author.username = req.user.username;
            newlycreate.save();
            res.redirect('campground');
        }
    });
});

//ROUTE IF PERSON TRIES TO ACCESS NEW PAGE

router.get('/new',isLoggedIn, function (req, res) {
    res.render('campgrounds/new');
});

//ROUTE IF PERSON TRIES TO SEE MORE ABOUT CAMPGROUNDS

router.get('/:id', function (req, res) {
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

//ROUTE IF PERSON TRIES TO SEE MORE ABOUT CAMPGROUNDS

router.get('/:id/edit', checkAuthtoedit, function (req, res) {
    campground.findById(req.params.id,function(err, camp){
        if(err){
            console.log(err);
        }else{
            //console.log(camp);
           res.render('campgrounds/edit',{camp: camp});
        }
    });
});

//ROUTE IF PERSON TRIES TO SEE MORE ABOUT CAMPGROUNDS

router.post('/:id/edit', function (req, res) {
    //console.log(req.body);
    campground.findByIdAndUpdate(req.params.id,{$set:req.body},function(err, camp){
        if(err){
            console.log(err);
        }else{
          //console.log(camp);
          res.redirect("/campground/" + req.params.id);
        }
    });
});

router.get('/:id/delete', checkAuthtodelete,function (req, res) {
    // campground.findByIdAndRemove(req.params.id,function(err, camp){
    //     if(err){
    //         console.log(err);
    //     }else{
    //       res.redirect("/campground/");
    //     }
    // });
});

//ISLOGGEDIN MIDDLEWARE
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect("/login");
    }
}

function checkAuthtoedit(req, res, next){
    campground.findById(req.params.id,function(err, camp){
        if(req.isAuthenticated()){
            var id = camp.author.id;
            var loggedid = req.user.id;
            if(id.equals(loggedid)){
               res.render('campgrounds/edit',{camp: camp});      
            }else{
                console.log('not mathched');
            }
        }else{
            res.send("back");
        }
    });
}
function checkAuthtodelete(req, res, next){
    campground.findById(req.params.id,function(err, camp){
        if(req.isAuthenticated()){
            var id = camp.author.id;
            var loggedid = req.user.id;
            if(id.equals(loggedid)){
               campground.findByIdAndRemove(req.params.id,function(err, camp){
                    if(err){
                        console.log(err);
                    }else{
                      res.redirect("/campground/");
                    }
                });     
            }else{
                console.log('not mathched');
            }
        }else{
            res.send("back");
        }
    });
}

module.exports = router;








