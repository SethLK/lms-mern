// Course.jsx

import CourseCard from "../components/course/course_card";
import { useState, useEffect } from "react";
import "../style/courses/courses.css";
import NavBar from "../components/navbar";
import Cookies from "js-cookie";

export default function Course() {
    const userString = Cookies.get("user");
    const user = userString ? JSON.parse(userString) : null;

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetching() {
            try {
                const res = await fetch("http://localhost:3000/api/courses");
                if (res.ok) {
                    const data = await res.json();
                    setCourses(data);
                } else {
                    console.error("Error fetching course data");
                }
            } catch (e) {
                console.error("Error fetching course data", e);
            }
        }

        fetching();
    }, []);

    return (
        <>
            <NavBar />
            <div className="body">
                <h1>Courses</h1>

                <div className="courses">
                    {Array.isArray(courses) && courses.slice().reverse().map((course) => (
                        <CourseCard
                            key={course._id}
                            title={course.title}
                            description={course.description}
                            instructor={course.instructor.username}
                            _id={course._id}
                            enrolled={user && course.enrolledUsers?.includes(user._id)}
                            edit={user && course.instructor._id === user._id}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
