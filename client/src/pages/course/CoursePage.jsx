import NavBar from "../../components/navbar";
import { useState, useEffect } from "react";
import getParam from "../../myhooks/getParam";

export default function CoursePage() {
    const [course, setCourse] = useState({});
    const url = getParam("whole");

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`http://localhost:3000/api${url}`);
                if(res.ok){
                    const data = await res.json();
                    setCourse(data);
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
                            <p>Description: {course.description} </p>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
