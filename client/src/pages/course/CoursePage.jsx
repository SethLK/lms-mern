import NavBar from "../../components/navbar"
import { useState, useEffect } from "react"
import getParam from "../../myhooks/getParam"

export default function CoursePage(){
    const [course, setCourse] = useState({})
    const course_id = getParam('single')
    const url = getParam("whole")
    
    useEffect(()=>{
        async function fetch(){
            try{
                const res = await fetch(`http:`)
            }
        }
    })

    return(
        <>
            <NavBar />
            
        </>
    )
}