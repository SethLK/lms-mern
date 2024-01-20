import { Link } from "react-router-dom";
import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import MiniCourseCard from "../../components/course/course_card.mini";

export default function InstructorPanel() {
    const authToken = Cookies.get("jwt_token");

    const [courses, setCourses] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");
    const userString = Cookies.get("user");
    const user = userString ? JSON.parse(userString) : null;
    const userCourses = courses.filter(course => course.instructor && course.instructor._id === user._id);

    const [showCreateForm, setShowCreateForm] = useState(false); // Added state variable

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
            instructorId: user._id,
        };

        try {
            const response = await fetch("http://localhost:3000/api/create-course", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${authToken}`,
                },
                body: JSON.stringify(courseData),
            });

            if (response.ok) {
                const newCourse = await response.json();
                setCourses([...courses, newCourse]);
                setShowCreateForm(false); // Set the state to hide the create form
                // You may add additional logic or feedback here
            } else {
                console.error("Error creating course", response.statusText);
                const err = await response.json();
                setMessage(err.message);
            }
        } catch (error) {
            console.error("Error creating course", error);
        }
    };

    return (
        <>
            <NavBar />
            <div className="body">
                <h1>Instructor Panel</h1>
                {message && <p style={{ color: 'red' }}>{message}</p>}
                <div className="create-course">
                    <div className="createSession" id="createSession">
                        {showCreateForm && (
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="title">Title
                                    <input
                                        type="text"
                                        name="title"
                                        id="course_title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
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
                                        required
                                    ></textarea>
                                </label>
                                <br />

                                <button type="submit">Create</button>
                            </form>
                        )}
                    </div>
                    <button onClick={() => setShowCreateForm(!showCreateForm)}>Toggle Create Form</button>
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
