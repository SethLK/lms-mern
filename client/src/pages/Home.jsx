import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
            
            <h1>Home page</h1>
            <Link to={'courses'}>Courses</Link>
            <br />

        </>
    )
}