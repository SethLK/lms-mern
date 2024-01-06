import CourseCard from "../components/course/course_card";
import { useState, useEffect } from "react";
import "../../public/style/courses/courses.css"

export default function Course(){
    const [courses, setCourses] = useState([])
    useEffect(()=>{
        async function fetching(){
            try{
                const res = await fetch("http://localhost:3000/api/courses")
                if(res.ok){
                    const data = await res.json()
                    setCourses(data)
                }else{
                    console.error("Error fetching course data")
                }
            }catch(e){
                console.error("Error fetching course data", e);
            }
        }

        fetching()
    }, [])
    return(
        <>
            <h1>Courses</h1>
            <div className="courses">
                {courses.map((course) => (
                    <CourseCard
                        key={course.id} // Assuming each course has a unique id
                        title={course.title}
                        description={course.description}
                        instructor={course.instructor}
                    />
                    ))}
            </div>
        </>
    )
}