import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function LessonPage() {
    const [lesson, setLesson] = useState({});
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [pageForm, showpageForm] = useState(false);
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
                <button onClick={() => showpageForm(!pageForm)}>
                    Add Lessons
                </button>
                {pageForm && (
                    <>
                        <form action="">
                            <input type="text" placeholder="page-title" name="title" value={title}/>
                            <ReactQuill theme="snow" value={content} onChange={setContent} />;
                            <button type="submit">Add</button>
                        </form>
                    </>
                )}
                {lesson.pages?.map((page, index) => (
                    <li key={index}>
                        <Link to={`${uri}/pages/${page}`}>{`Page ${index + 1}`}</Link>
                    </li>
                ))}
            </div>
        </>
    );
}
