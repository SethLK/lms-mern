//db.js

import mongoose, { connect } from "mongoose";

connect('mongodb://127.0.0.1:27017/lms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'lms'
}).then(() =>{
    console.log("database connected")
}).catch((error)=>{
    console.error("Connection error", error)
})

export default mongoose