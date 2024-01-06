import React, { useState, useEffect } from "react";
import getParam from "../myhooks/getParam";
import { Link } from "react-router-dom";

async function fetchData(course_id, setCourse) {
    try {
        const res = await fetch(`http://localhost:3000/api/courses/${course_id}`);
        if (res.ok) {
            const data = await res.json();
            setCourse(data);
        } else {
            console.error("Error fetching course data");
        }
    } catch (e) {
        console.error("Error fetching course data", e);
    }
}

async function fetchLessons(course_id, setLesson) {
    try {
        const res = await fetch(`http://localhost:3000/api/courses/${course_id}/lessons`);
        if (res.ok) {
            const data = await res.json();
            setLesson(data); 
        } else {
            console.error("Error fetching Lessons");
        }
    } catch (e) {
        console.error("Error fetching lessons data", e);
    }
}

function SingleCourse() {
    const [course, setCourse] = useState({});
    const [lesson, setLesson] = useState([]); // Initialize as an empty array
    const course_id = getParam('single');
    const url = getParam("whole");

    useEffect(() => {
        fetchData(course_id, setCourse);
        fetchLessons(course_id, setLesson);
    }, [course_id]);

    return (
        <>
            <div>
                {course && (
                    <>
                        <h1>Title: {course.title}</h1>
                        <p>Description: {course.description} </p>
                    </>
                )}
                {Array.isArray(lesson.lessons) && lesson.lessons.map((les) => (
                    <p key={les._id}>
                        <Link to={`${url}/lessons/${les._id}`}>Lesson title: {les.title}</Link>
                    </p>
                ))}

            </div>
        </>
    );
}

export default SingleCourse;
