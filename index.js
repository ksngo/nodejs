const express = require('express')
const hbs = require('hbs')
const setup = require("./setup")
const hbsHelper = require("./hbsHelper")
const routes = require("./routes")

let app = express()

// from setup.js //
setup.setupExpress(app)

//from hbsHelper.js//
hbsHelper.hbsHelper()



// Routes //

// from routes.js //

// previously without route.js //
// app.get("/", function(req,res){
//   res.render("index")
//  })

app.use("/", routes)










// Listen //

app.listen(3000, ()=>{
    console.log("server started")
})