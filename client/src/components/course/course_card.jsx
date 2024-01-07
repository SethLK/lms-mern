import "../../../public/style/courses/course_card.css"
import { useNavigate } from "react-router-dom"

export default function CourseCard(props){
    const redirect = useNavigate()
    const redirectOnClick = () => redirect(`/courses/${props._id}`)
    return(
        <div className="custom-card" onClick={redirectOnClick}>
            <h3>Title: {props.title}</h3>
            <p>Description: {props.description}</p>
            <p>Instructor: {props.instructor}</p>
        </div>
    )
}

  
// title,description,instructor