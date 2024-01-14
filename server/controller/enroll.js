
const enroll = async (req, res) => {
    try {
        const { courseId, user_id } = req.body;
        // const user = await User.findOne({ username: name }, '_id');
        const user = await User.findOne({ _id: user_id })
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
}

module.exports = enroll;