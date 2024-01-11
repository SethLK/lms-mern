// CourseCard.jsx

import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/style/courses/course_card.css";

export default function CourseCard(props) {
    const navigate = useNavigate();
    
    const redirectOnClick = () => navigate(`/courses/${props._id}`);
    
    return (
        <div className="custom-card" onClick={redirectOnClick}>
            <h3>Title: {props.title}</h3>
            <p>Course id: {props._id}</p>
            <p>Description: {props.description}</p>
            <p>Instructor: {props.instructor}</p>
            {props.enrolled ? <p>Enrolled</p> : null}
        </div>
    );
}


  
// title,description,instructor