var express = require('express');
var campground = require('../models/campground');
var comments = require('../models/comment');
var router = express.Router({ mergeParams: true });
//ROUTE IF PERSON GOES TO INSERT COMMENT PAGE

router.get('/',isLoggedIn, function (req, res) {
    var id = req.params.id;
    // res.send(_id);
    campground.findById({"_id":id},function(err, selectedids){
        if(err){
            console.log(err);
        }else{
            // console.log(id);
            // console.log(selectedids);
            res.render('comments/comments',{selectedid: selectedids});
        }
    });
});

//ROUTE IF PERSON SUBMITS THE COMMENT PAGE

router.post('/add',isLoggedIn, function (req, res) {
    // var id = req.params.id;
    // // res.send(_id);
    campground.findById(req.params.id,function(err, camp){
        if(err){
            console.log(err);
        }else{
            comments.create(req.body.comment,function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    comment.author.id = req.user._id; 
                    comment.author.username = req.user.username;     // WHY IS THIS EVEN WORKING
                    //console.log(campground.username);
                    //push and save saves the objectID
                    comment.save();
                    camp.comments.push(comment);
                    camp.save();
                    res.redirect("/campground/" + camp["_id"]);
                }
            })
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





