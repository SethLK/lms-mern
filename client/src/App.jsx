import { Link } from "react-router-dom";
import "./components/navbar"
import NavBar from "./components/navbar";

function App() {
    return (
        <>
        <NavBar />
        <div className="body">
            <h1>Home page</h1>
            <Link to={'courses'}>Courses</Link>
            <br />
            <Link to={'users'}>Users</Link>
        </div>
        </>
    );
}

export default App;