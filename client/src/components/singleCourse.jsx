import React, { useState, useEffect } from "react";
import getParam from "../myhooks/getParam";

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

function SingleCourse() {
    const [course, setCourse] = useState([]);
    const course_id = getParam('single');

    useEffect(() => {
        fetchData(course_id, setCourse);
    }, [course_id]);

    return (
        <>
            <div>
                <h1>Title: {course.title}</h1>
                <p>Description: {course.description} </p>
            </div>
        </>
    );
}

export default SingleCourse;
