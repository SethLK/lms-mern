import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function CoursePage() {
    const [course, setCourse] = useState({});
    const uri = location.pathname
    console.log(uri)

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
    }, []);

    return (
        <>
            <NavBar />
            <div className="body">
                <div>
                    {course && (
                        <>
                            <h1>Title: {course.title}</h1>
                            <p>Description: {course.description}</p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
