import { Link } from "react-router-dom";

function App() {
    return (
        <>
            <h1>Home page</h1>
            <Link to={'courses'}>Courses</Link>
            <br />
            <Link to={'users'}>Users</Link>
        </>
    );
}

export default App;