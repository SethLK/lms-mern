// CourseCard.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../public/style/courses/course_card.css";
import Cookies from 'js-cookie';

export default function CourseCard(props) {
    const userString = Cookies.get("user");
    const user = JSON.parse(userString);
    // const navigate = useNavigate();
    const [isEnrolled, setIsEnrolled] = useState(props.enrolled);

    const handleEnroll = async () => {
        try {
            const response = await fetch("http://localhost:3000/enroll", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: props._id,
                    user_id: user._id
                }),
            });

            if (response.ok) {
                alert("Enrolled successfully");
                setIsEnrolled(true);
            } else {
                alert('An error occurred while enrolling');
                
            }
        } catch (error) {
            console.error("Error enrolling:", error);
            alert('An error occurred while enrolling');
        }
    };

    // const redirectOnClick = () => navigate(`/courses/${props._id}`);

    return (
        <div className="custom-card">
            <h3>Title: {props.title}</h3>
            <p>Course id: {props._id}</p>
            <p>Description: {props.description}</p>
            <p>Instructor: {props.instructor}</p>
            {isEnrolled ? (
                <p className="enroll">Enrolled</p>
            ) : (
                <button onClick={handleEnroll}>Enroll</button>
            )}
        </div>
    );
}


// title,description,instructor