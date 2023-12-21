import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import getParam from "../myhooks/getParam";

export default function GetLessonByCourse() {
    const [lesson, setLesson] = useState({});
    const lesson_uri = getParam('whole');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api${lesson_uri}`);
                console.log(lesson_uri)
                if (res.ok) {
                    const data = await res.json();
                    setLesson(data);
                } else {
                    console.error("Error fetching Lesson");
                }
            } catch (e) {
                console.error("Error fetching lessons data", e);
            };
        };
        // fetchData();
        // const fetchLessons = async () =>{
        //     try{

        //     }
        // }
    }, [lesson_uri]);

    return (
        <>
            {lesson && (
                <div>
                    <h1>{lesson.title}</h1>
                    
                </div>
            )}
        </>
    );
}
