const express = require("express");
let app = express();
let port = 8080;
const mongoose = require("mongoose");
const Post = require("./models/posts.js");


main()
.then(console.log("connected to mongodb"))
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/instagram');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.listen(port,()=>{
console.log("Server started at: 8080");
});

let path = require("path");
app.set("views",path.join(__dirname,"/views"));
app.set("view engine",'ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));


let methodOverride = require('method-override');
app.use(methodOverride('_method'));

app.get("/posts",async (req,res)=>{
    let allPosts = await Post.find();
    res.render("index.ejs",{allPosts});
});

app.get("/posts/new",(req,res)=>{
   res.render("new.ejs");
});

app.post("/posts/new",(req,res)=>{
    let {user,content} = req.body;
   let newPost = new Post({user:user,content:content})
   newPost.save()
   .then((res)=>console.log("new post is saved"))
   .catch((e)=>console.log(e));
    res.redirect("/posts");
});

app.get("/posts/:id",async(req,res)=>{
    let {id} = req.params;
    let post = await Post.findById(id);
    res.render("show.ejs", {post});

});
  
app.patch("/posts/:id",async(req,res)=>{
    let {id} = req.params;
    let {content:newContent} = req.body;
    let updatedPost = await Post.findByIdAndUpdate(id,{content:newContent});
    res.redirect("/posts");
})

app.get("/posts/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let post = await Post.findById(id);
    res.render("edit.ejs", {post});
});

app.delete("/posts/:id",async(req,res)=>{
   let {id} = req.params;
   await Post.findByIdAndDelete(id);
   res.redirect("/posts");
});
