const express = require("express")
const router = express.Router()
const mongoUtil = require("./mongoUtil")
const ObjectId = require("mongodb").ObjectId


router.get("/", async (req,res)=>{
    let db = mongoUtil.getDB()
    
    let data = await db.collection("tasks").find().toArray()
        
    res.render("tasks.hbs", {
        data
    })
})

router.get("/create", async function(req,res){
    res.render("createtasks.hbs")
})

router.post("/create", async (req,res)=>{
    let date = new Date(req.body.date)
    let description = req.body.description
    let due = new Date(req.body.due)
    let completed = false
    let complete_date = ""

    let db = mongoUtil.getDB()

    await db.collection("tasks").insertOne({
        date, description, due, completed, complete_date
    })

    res.redirect("/tasks")
})

router.get("/edit/:id", async (req,res)=>{
    
    data = await mongoUtil.getDB().collection("tasks").findOne({
        _id: ObjectId(req.params.id)
    })
    
    res.render("edittask.hbs", {
        "data":data
    })

})

router.post("/edit/:id", async (req,res)=>{
    let date = new Date(req.body.date)
    let description = req.body.description
    let due = new Date(req.body.due)
    let completed = req.body.completed
    
    let complete_date
    if (req.body.complete_date) {
        console.log("true")
        complete_date = new Date(req.body.complete_date)
    } else {
        console.log("false")
        complete_date = ""
    }
    
    let db = mongoUtil.getDB()
    
    await db.collection("tasks").updateOne({
        _id:ObjectId(req.params.id)
    },{
        "$set": {
            date ,description, due, completed, complete_date
        }
    })

    res.redirect('/tasks')
})

router.get("/delete/:id", async (req,res)=>{
    let data = await mongoUtil.getDB().collection("tasks").findOne({
        _id:ObjectId(req.params.id)
    })

    res.render("deletetask.hbs", {
        data
    })
})

router.post("/delete/:id", async (req,res)=>{
    await mongoUtil.getDB().collection("tasks").deleteOne({
        _id: new ObjectId(req.params.id)
    })

    res.redirect("/tasks")
})

module.exports = router