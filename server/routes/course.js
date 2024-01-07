const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const Page = require("../model/Page");
const User = require("../model/User")
const express = require("express");

const Router = express.Router();

Router.get("/api/courses", async (req, res) => {
    try {
        const courses = await Course.find();

        // Fetch instructor details for each course
        const coursesWithInstructors = await Promise.all(
            courses.map(async (course) => {
                const instructor = await User.findById(course.instructor);
                return {
                    ...course._doc,
                    instructor: instructor
                };
            })
        );

        res.status(200).json(coursesWithInstructors);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
Router.get("/api/courses/:course_id", async (req, res) => {
    try {
        const course_id = req.params.course_id;
        const course = await Course.findById(course_id);

        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Find the instructor by ID
        const instructor = await User.findById(course.instructor);

        if (!instructor) {
            return res.status(404).json({ error: "Instructor not found" });
        }

        // Update the course's instructor field with the full instructor object
        course.instructor = instructor;

        res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


Router.get("/api/lessons", async (req, res) => {
    try {
        const lessons = await Lesson.find();
        res.status(200).json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

Router.get("/api/lessons/:lesson_id", async (req, res) => {
    try {
        const lesson_id = req.params.lesson_id;
        const lessons = await Lesson.findById(lesson_id);
        res.status(200).json(lessons);
    } catch (error) {
        console.error("Error fetching lessons:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
Router.get("/api/pages/", async (req, res) => {
    try {
        const pages = await Page.find();
        res.status(200).json(pages);
    } catch (error) {
        console.error("Error fetching pages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

Router.get("/api/pages/:page_id", async (req, res) => {
    try {
        const page_id = req.params.page_id;
        const pages = await Page.findById(page_id);
        res.status(200).json(pages);
    } catch (error) {
        console.error("Error fetching pages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

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

Router.get('/api/courses/:id/lessons/:lesson_id/pages', async (req, res) => {
    const lesson_id = req.params.lesson_id;
    try {
        const lesson = await Lesson.findById(lesson_id);
        if (!lesson) {
            return res.status(404).json({ message: 'Lesson not found' });
        }
        const pages = await Page.find({ _id: { $in: lesson.pages } });
        res.status(200).json({ pages });
    } catch (error) {
        console.error('Error fetching pages', error);
        res.status(500).json({ message: 'An error occurred while fetching pages' });
    }
});

module.exports = Router;