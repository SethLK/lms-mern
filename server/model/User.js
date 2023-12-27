const mongoose = require("../config/db");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['student', 'instructor', 'admin', 'staff'] },

    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
