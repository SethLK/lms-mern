// config.js
require("dotenv").config();

module.exports = {
    secretKey: process.env.JWT_SECRET,
};
  
// console.log(process.env.JWT_SECRET)