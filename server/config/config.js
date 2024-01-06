// config.js
require("dotenv").config();

module.exports = {
    secretKey: process.env.JWT_SECRET,
    mongoKey: process.env.MONGO
};
  
// console.log(process.env.JWT_SECRET)