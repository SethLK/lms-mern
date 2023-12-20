const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const Page = require("../model/Page");
const express = require("express");

const Router = express.Router();

// get lessons by course_id
Router.get('/api/courses/:id/lessons', async (req, res) => {
    try {
        const courseId = req.params.id;

        // Find the course by its ID
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Find lessons associated with the course
        const lessons = await Lesson.find({ _id: { $in: course.lessons } });

        res.status(200).json({ lessons });
    } catch (error) {
        console.error('Error fetching lessons:', error);
        res.status(500).json({ message: 'An error occurred while fetching lessons' });
    }
});

//get Single Lesson
Router.get('/api/courses/:id/lessons/:lesson_id', async (req, res) => {
    const lesson_id = req.params.lesson_id;
    try {
        const lesson = await Lesson.findById(lesson_id);
        if (!lesson) {
            return res.status(404).json({ error: "lesson not found" });
        }
        res.status(200).json(lesson);

    } catch (error) {
        console.error("Error fetching lesson:", error);
        res.status(500).json({ error: "An error occurred while fetching the lesson" });
    }
});

module.exports = Router;