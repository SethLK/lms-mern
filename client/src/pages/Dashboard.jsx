import NavBar from "../components/navbar";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import CourseCard from "../components/course/course_card";
import { Navigate } from 'react-router-dom';

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const userString = Cookies.get("user");
    if (!userString) {
        return <Navigate to="/login" />;
      }
    const user = userString ? JSON.parse(userString) : null;
    const userCourses = courses.filter(course => course.instructor._id === user._id);
    const enrolledCourses = courses.filter(course => course.enrolledUsers?.includes(user._id));

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
                <h1>Dashboard</h1>

                {userCourses.length > 0 && (
                    <>
                        <h1>Your Courses</h1>
                        <div className="courses">
                            {userCourses.map((course) => (
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
                    </>
                )}

                <h1>Your progress</h1>
                {/* course.enrolledUsers?.includes(user._id) */}
                <div className="courses">
                    {enrolledCourses.map((course) => (
                        <CourseCard
                            key={course._id}
                            title={course.title}
                            description={course.description}
                            instructor={course.instructor.username}
                            _id={course._id}
                            enrolled={user && course.enrolledUsers?.includes(user._id)}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}