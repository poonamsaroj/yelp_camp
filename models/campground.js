
var mongoose = require("mongoose");
 // define Schema
var yelpcamp = mongoose.Schema({
   name: String,
   image: String,
   description: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("campground",yelpcamp);

 
