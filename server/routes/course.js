const authMiddleWare = require("../middleware/authMiddleware");
const Course = require("../model/Course");
const Lesson = require("../model/Lesson");
const Page = require("../model/Page");
const User = require("../model/User");
const express = require("express");
// const Enroll = require("../controller/enroll");

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

Router.post("/enroll", authMiddleWare, async (req, res) => {
    try {
        const { courseId } = req.body;
        // const user = await User.findOne({ username: name }, '_id');
        // const user = await User.findOne({ _id: user_id });
        const user = await User.findById(req.user.id);
        const course = await Course.findById(courseId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        // Ensure that user.enrolledCourses is initialized as an array


        // Check if the user is already enrolled in this course
        // const enrolled = user.enrolledCourses.includes(courseId);
        // if (enrolled) {
        //     return res.status(400).json({ success: false, message: 'User is already enrolled in this course' });
        // }

        // Assuming course is found and courseId exists, add the course to enrolledCourses
        user.enrolledCourses.push(course._id);

        // Save the user and course
        await user.save();

        // You can add this block to update the course as well if needed


        course.enrolledUsers.push(user._id);
        await course.save();

        res.status(200).json({ success: true, message: 'Enroll successful' });

    } catch (error) {
        console.error('Error enrolling user in course:', error);
        res.status(500).json({ success: false, message: 'An error occurred while enrolling user' });
    }
});

Router.post("/api/create-course", authMiddleWare, async (req, res) => {
    const { title, description } = req.body;

    try {
        // Find the instructor using the provided instructorId
        const instructor = await User.findById(req.user.id);

        if (!instructor) {
            return res.status(404).json({ success: false, message: 'Instructor not found' });
        }

        // Create a new course with the found instructor
        const newCourse = new Course({
            title: title,
            description,
            instructor,
        });

        // Save the new course to the database
        await newCourse.save();
        console.log(newCourse);

        res.status(200).json({ success: true, message: 'Course created successfully' });
    } catch (error) {
        console.error('Error creating course', error);
        res.status(500).json({ success: false, message: 'An error occurred while creating the course' });
    }
});

module.exports = Router;