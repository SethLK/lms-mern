const Course = require("../model/Course")
const express = require("express")

const Router = express.Router();

Router.get("/api/courses", async (req, res)=>{
    try{
        const courses = await Course.find();
        res.status(200).json(courses)
    }catch(e){
        console.error("Error fetching courses:", error.message);
    res.status(500).json({ error: "Internal server error" });
    }
})

module.exports = Router