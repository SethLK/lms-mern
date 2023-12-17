const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/lms', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'lms'
}).then(() => {
    console.log("Database connected");
}).catch((error) => {
    console.error("Connection error", error);
});

module.exports = mongoose;
