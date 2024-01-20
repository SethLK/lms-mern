import { Link } from "react-router-dom";

export default function MiniCourseCard(props) {
    return (
        <>
            <div className="custom-card-mini" >

                <h3>Course Title: {props.title}</h3>
                <p>Course id: {props._id}</p>
                <p>Description: {props.description}</p>
                <p><Link to={`/courses/${props._id}`}>Enter</Link></p>
            </div>
        </>
    );
}