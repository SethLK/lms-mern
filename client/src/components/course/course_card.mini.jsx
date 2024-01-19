export default function MiniCourseCard(props) {
    return (
        <>
            <div className="custom-card-mini" >

                <div>Course Title: {props._id}</div>
                <p>Course id: {props._id}</p>
                <p>Description: {props.description}</p>
            </div>
        </>
    );
}