const express = require("express");

let app = express();

let port = 8080;

app.listen(port,()=>{
console.log("Server started at: 8080");
});

let path = require("path");
app.set("views",path.join(__dirname,"/views"));
app.set("view engine",'ejs');
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
const{v4: uuidv4} = require("uuid");

let methodOverride = require('method-override');
app.use(methodOverride('_method'));


let posts = [{
    user:"hello_kitty",
    content:"hello i am kitty",
    img:"/cat.jpg",
    id:uuidv4()
},
{
    user:"iamparrot",
    content:"hello i am parrot",
    img:"/parrot.jpg",
    id:uuidv4()
},
{
    user:"bruno_here",
    content:"hello i am brouno",
    img:"/bruno.jpg",
    id:uuidv4()
},
{
    user:"iamana",
    content:"hello i am ana nichita",
    img:"/ana-nichita.jpg",
    id:uuidv4()
},
{
    user:"stefan_stefanchik",
    content:"hello i am stefan stefanchik",
    img:"/stefan-stefanchik.jpg",
    id:uuidv4()
}];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{

   res.render("new.ejs");

});

app.post("/posts/new",(req,res)=>{
    let {user,content} = req.body;
    const id = uuidv4(); 
    posts.push({id,user,content});
    console.log(req.body);
    res.redirect("http://localhost:8080/posts");
});

app.get("/posts/:id",(req,res)=>{

    const {id} = req.params;
    console.log(id);
    let post = posts.find((p) => id===p.id);
    console.log(post);
    res.render("show.ejs", {post});

});
  
app.patch("/posts/:id",(req,res)=>{
    const {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    let newContent  = req.body.content;
    post.content = newContent;
    console.log(newContent);
    res.redirect("/posts");
})

app.get("/posts/:id/edit",(req,res)=>{
    const {id} = req.params;
    let post = posts.find((p) => id===p.id);
    res.render("edit.ejs", {post});
});

