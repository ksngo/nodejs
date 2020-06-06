const express = require("express")
const router = express.Router()
const mongoUtil = require("./mongoUtil")


router.get("/", async (req,res)=>{
    let db = mongoUtil.getDB()
    
    let data = await db.collection("tasks").find().toArray()
        
    res.render("tasks.hbs", {
        data
    })
})



module.exports = router