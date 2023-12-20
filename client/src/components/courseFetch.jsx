import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CourseFetch(){
    const [courseData, setCourseData] = useState([])
    useEffect(()=>{
        async function fetchData(){
            try{
                const res = await fetch("http://localhost:3000/api/courses")
                if(res.ok){
                    const data = await res.json()
                    setCourseData(data)
                }else{
                    console.error("Error fetching course data")
                }
            }catch(e){
                console.error("Error fetching course data", e);
            }
        }
        fetchData()
    }, [])
    return(
        <>
        <div>
            <h2>Course List</h2>
            <ul>
            {courseData.map((course) => (
                <li key={course._id}><Link to={course._id}>{course.title}</Link></li>
            ))}
            </ul>
        </div>
        <Link to={"/"}>Back</Link>
        </>
    )
}

export default CourseFetch