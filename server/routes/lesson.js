const authMiddleWare = require("../middleware/authMiddleware");
const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const Page = require("../model/Page");
const User = require("../model/User");
const express = require("express");
// const Enroll = require("../controller/enroll");

const Router = express.Router();

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

Router.post('/api/courses/:id/lessons/:lesson_id', authMiddleWare, async (req, res) => {
    const { title, content } = req.body;
    const lesson_id = req.params.lesson_id;
    const instructor = await User.findById(req.user.id);

    if (!instructor) {
        return res.status(404).json({ success: false, message: 'Instructor not found' });
    }

    try {
        const newPage = new Page({
            title,
            content,
            instructor
        })
    
        await newPage.save()
        console.log(newPage)
    
        const lesson = await Lesson.findById(lesson_id)
        lesson.pages.push(newPage._id);
        lesson.save()
        console.log(lesson)
    
        res.status(200).json({ success: true, message: 'Page created successfully' });

    } catch (error) {
        console.error('Error creating Page', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the Page' });
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

Router.get('/api/courses/:id/lessons/:lesson_id/pages', authMiddleWare, async (req, res) => {
    const lesson_id = req.params.lesson_id;
    try {
        const lesson = await Lesson.findById(lesson_id);
        if (!lesson) {
            return res.status(404).json({ error: "lesson not found" });
        }

        const pages = await Page.find({ _id: { $in: lesson.pages } });
        res.status(200).json({ pages });
    } catch (error) {
        console.error('Error fetching pages', error);
        res.status(500).json({ message: 'An error occurred while fetching pages' });
    }
});


Router.get('/api/courses/:id/lessons/:lesson_id/pages/:page_id', async (req, res) => {
    const page_id = req.params.page_id;
    try {
        const page = await Page.findById(page_id);
        if (!page) {
            return res.status(404).json({ message: 'Page not found' });
        }
        res.status(200).json(page);
    } catch (error) {
        console.error('Error fetching pages', error);
        res.status(500).json({ message: 'An error occurred while fetching pages' });
    }
});

Router.post("/api/courses/:course_id/lessons", authMiddleWare, async (req, res) => {
    try {
        const { title } = req.body;
        const course_id = req.params.course_id;
        const instructor = await User.findById(req.user.id);

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

module.exports = Router;