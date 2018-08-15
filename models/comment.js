var mongoose = require("mongoose");
 
var commentSchema = new mongoose.Schema({
      author: {
                id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "users"
                    },
                username: String
            },
    text: String
});
 
module.exports = mongoose.model("Comment", commentSchema);