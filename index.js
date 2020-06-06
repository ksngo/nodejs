const express = require('express')
const hbs = require('hbs')

let app = express()

//  express set hbs as view engine

app.set("view engine", "hbs")

// express use express static in public folder

app.use(express.static("public"))


// express use express urlencoded and json for form processing

app.use(express.urlencoded({extended:false}))
app.use(express.json())

// hbs registerHelper "extend" and "block"

var blocks = {};	

hbs.registerHelper("extend", function (name, context) {
  var block = blocks[name];
  if (!block) {
    block = blocks[name] = [];
  }
  block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper("block", function (name) {
  var val = (blocks[name] || []).join("\n");
  // clear the block
  blocks[name] = [];
  return val;
});



// Routes //

app.get("/", function(req,res){
    res.render("index")
})

app.get("/add", function(req,res){
    res.render("add")
})

app.post("/add", function(req,res){

    input = req.body.input
    console.log(input)

    res.redirect("/")
})











// Listen //

app.listen(3000, ()=>{
    console.log("server started")
})