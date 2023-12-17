import express from "express";
const app = express()

import cors from "cors";

app.use(cors())

app.get("/", (req, res) =>{
    res.send("HEllo THere")
})

app.listen(3000, (req, res) =>{
    console.log("Server run on 3000")
})

