export default function CourseCard(props){
    return(
        <div class="custom-card">
            <h3>Title: {props.title}</h3>
            <p>Description: {props.description}</p>
            <p>Instructor: {props.instructor}</p>
        </div>
    )
}

  
// title,description,instructor