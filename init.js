// getting-started.js
const mongoose = require('mongoose');

main().then(console.log("connected to mongoDb")).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/instagram');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const Post = require("./models/posts.js");

let allPosts = [{
    user:"hello_kitty",
    content:"hello i am kitty",
    img:"/cat.jpg",
    
},
{
    user:"iamparrot",
    content:"hello i am parrot",
    img:"/parrot.jpg",
    
},
{
    user:"bruno_here",
    content:"hello i am brouno",
    img:"/bruno.jpg",
    
},
{
    user:"iamana",
    content:"hello i am ana nichita",
    img:"/ana-nichita.jpg",
   
},
{
    user:"stefan_stefanchik",
    content:"hello i am stefan stefanchik",
    img:"/stefan-stefanchik.jpg",
   
}];

Post.insertMany(allPosts);

