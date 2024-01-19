import { Link } from "react-router-dom";
import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MiniCourseCard from "../../components/course/course_card.mini";

export default function InstructorPanel() {
    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const userString = Cookies.get("user");
    const user = userString ? JSON.parse(userString) : null;
    const userCourses = courses.filter(course => course.instructor._id === user._id);

    useEffect(() => {
        async function fetching() {
            try {
                const res = await fetch("http://localhost:3000/api/courses");
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                    setMessage(data.message);
                } else {
                    const data = await res.json();
                    console.error("Error fetching course data");
                    setMessage(data.message);
                }
            } catch (e) {
                console.error("Error fetching course data", e);
            }
        }

        fetching();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const courseData = {
            title: title,
            description: description,
            instructorName: user._id,
        };

        try {
            const response = await fetch("http://localhost:3000/api/create-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                const newCourse = await response.json();
                setCourses([...courses, newCourse]);
                setShowCreateForm(false); // Hide the create form after successful submission
                // You may add additional logic or feedback here
            } else {
                console.error("Error creating course", response.statusText);
                // Handle error or provide feedback to the user
            }
        } catch (error) {
            console.error("Error creating course", error);
            // Handle error or provide feedback to the user
        }
    };

    return (
        <>
            <NavBar />
            <div className="body">
                <h1>Instructor Panel</h1>
                <div className="create-course">
                    <div className="createSession" id="createSession">
                        {message && <p style={{ color: 'red' }}>{message}</p>}
                        <form onSubmit={handleSubmit}>

                            <label htmlFor="title">Title
                                <input
                                    type="text"
                                    name="title"
                                    id="course_title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </label>
                            <br />

                            <label htmlFor="description">Description
                                <br />
                                <textarea
                                    name="description"
                                    id="course_description"
                                    cols="30"
                                    rows="4"
                                    placeholder="Description max 100"
                                    maxLength="100"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                            </label>
                            <br />

                            <button type="submit">Create</button>
                        </form>
                    </div>
                    <button>Create Course</button>
                </div>
                <div className="flex-container">
                    <div className="your-courses">
                        <h2>Your Courses</h2>
                        <div className="courses">
                            {userCourses.map((course) => (
                                <MiniCourseCard
                                    key={course._id}
                                    title={course.title}
                                    description={course.description}
                                    _id={course._id}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="your-students">
                        {/* Display your students or any other relevant information */}
                    </div>
                </div>
            </div>
        </>
    );
}

