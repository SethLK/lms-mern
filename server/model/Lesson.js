const mongoose = require("../config/db");

const lessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Page" }],
    createAt: { type: Date, default: Date.now },
});

const Lesson = mongoose.model("Lesson", lessonSchema);

module.exports = Lesson;