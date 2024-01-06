const mongoose = require('mongoose');
const config = require("../config/config");

mongoose.connect(config.mongoKey, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'lms'
}).then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.error("Connection error", error);
});

module.exports = mongoose;
