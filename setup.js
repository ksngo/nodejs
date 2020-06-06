const express = require("express")
const hbs = require("hbs")

function setupExpress(app){

    //  express set hbs as view engine

    app.set("view engine", "hbs")

    // express use express static in public folder

    app.use(express.static("public"))


    // express use express urlencoded and json for form processing

    app.use(express.urlencoded({extended:false}))
    app.use(express.json())


}

module.exports = {
    setupExpress
}