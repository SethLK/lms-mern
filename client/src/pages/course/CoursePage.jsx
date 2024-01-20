import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function CoursePage() {
    const [course, setCourse] = useState({});
    const userString = Cookies.get("user")
    const userData = JSON.parse(userString);
    const uri = location.pathname;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3000/api${uri}`);
                if (res.ok) {
                    const data = await res.json();
                    setCourse(data);
                } else {
                    console.error("Error fetching course data");
                }
            } catch (err) {
                console.error("Error fetching course data", err);
            }
        }

        fetchData();
    }, [uri]);

    return (
        <>
            <NavBar />
            <div className="body">
                <div>
                    {course && (
                        <>
                            <h1>Title: {course.title}</h1>
                            {userData && userData.role === "instructor" && (
                                <Link>Add Lessons</Link>
                            )}
                            <p>Description: {course.description}</p>
                            <h2>Lessons:</h2>
                            <ul>
                                {course.lessons?.map((lesson, index) => (
                                    <li key={index}>
                                        <Link to={`${uri}/lessons/${lesson}`}>{`Lesson ${index + 1}`}</Link>
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
