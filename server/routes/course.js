const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const Page = require("../model/Page");
const express = require("express");

const Router = express.Router();

Router.get("/api/courses", async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

Router.get("/api/courses/:course_id", async (req, res) => {
    try {
        const course_id = req.params.course_id;
        const courses = await Course.findById(course_id);
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error fetching courses:", error);
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
        const pages = await Page.findById(page_id)
        res.status(200).json(pages);
    } catch (error) {
        console.error("Error fetching pages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = Router;