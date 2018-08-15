
var mongoose = require("mongoose");
 // define Schema
var yelpcamp = mongoose.Schema({
   name: String,
   url: String,
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ],
   author: {
      id:{
         type: mongoose.Schema.Types.ObjectId,
         ref: "users"
      },
      username: String
   }
});

module.exports = mongoose.model("campground",yelpcamp);

 
