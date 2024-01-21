const authMiddleWare = require("../middleware/authMiddleware");
const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const Page = require("../model/Page");
const User = require("../model/User");
const express = require("express");
// const Enroll = require("../controller/enroll");

const Router = express.Router();

Router.post("/api/courses/:course_id", authMiddleWare, async (req, res) => {
    try {
        const { title } = req.body;
        const course_id = req.params.course_id;
        const instructor = User.findById(req.user.id);

        if (!instructor) {
            return res.status(404).json({ success: false, message: 'Instructor not found' });
        }

        const newLesson = new Lesson({
            title,
            instructor,
        });

        await newLesson.save();
        console.log(newLesson);

        const course = await Course.findById(course_id);
        course.lessons.push(newLesson._id);
        await course.save();
        console.log(course);

        res.status(200).json({ success: true, message: 'Lesson created successfully' });

    } catch (error) {
        console.error('Error creating Lesson', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the Lesson' });
    }
});

module.exports = Router