import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getParam from "../myhooks/getParam";

export default function GetLessonByCourse() {
    const [lesson, setLesson] = useState({});
    const [pages, setPages] = useState([]);
    const lesson_uri = getParam('whole');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api${lesson_uri}`);
                console.log(lesson_uri);
                if (res.ok) {
                    const data = await res.json();
                    setLesson(data);
                } else {
                    console.error("Error fetching Lesson");
                }
            } catch (e) {
                console.error("Error fetching lessons data", e);
            }
        };
        fetchData();

        const fetchPages = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api${lesson_uri}/pages`);
                console.log(lesson_uri);
                if (res.ok) {
                    const data = await res.json();
                    setPages(data);
                } else {
                    console.error("Error fetching Pages");
                }
            } catch (e) {
                console.error("Error fetching pages data", e);
            }
        };
        fetchPages();
    }, [lesson_uri]);

    return (
        <>
            {lesson && (
                <div>
                    <h1>{lesson.title}</h1>
                    {pages.map((page) => (
                        <Link key={page._id} to={`/pages/${page._id}`}>{page.title}</Link>
                    ))}
                </div>
            )}
        </>
    );
}
