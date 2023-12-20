const mongoose = require("../config/db");

const pageSchema = new mongoose.Schema({
    title: { type: String, require: true },
    content: { type: String, require: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createAt: { type: Date, default: Date.now },
});

const Page = mongoose.model("Page", pageSchema);

module.exports = Page;