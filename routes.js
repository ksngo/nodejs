const express = require("express")
const router = express.Router()



router.get("/", function(req,res){
    res.render("index")
})

router.get("/add", function(req,res){
    res.render("add")
})

router.post("/add", function(req,res){

    input = req.body.input
    console.log(input)

    res.redirect("/")
})


module.exports = router