import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function LessonPage() {
    const [lesson, setLesson] = useState({});
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const uri = location.pathname;

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3000/api${uri}`);
                if (res.ok) {
                    const data = await res.json();
                    setLesson(data);
                } else {
                    console.error("Error fetching Lesson data");
                }
            } catch (err) {
                console.error("Error fetching Lesson data", err);
            }
        }

        fetchData();
    }, [uri]);

    return (
        <>
            <NavBar />
            <div className="body">
                <h1>{lesson.title}</h1>
                {lesson.pages?.map((page, index) => (
                    <li key={index}>
                        <Link to={`${uri}/pages/${page}`}>{`Page ${index + 1}`}</Link>
                    </li>
                ))}
            </div>
        </>
    );
}
