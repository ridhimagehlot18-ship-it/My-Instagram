const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    user:{
        type:String
    },
    content:{
        type:String
    },
    img:{
        type:String
    }
});

const Post  = mongoose.model("Post",userSchema);


module.exports = Post;