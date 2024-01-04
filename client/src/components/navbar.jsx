import "../../public/navbar/style.css";
import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <>
            <nav>
                <ul>
                    <li>Home</li>
                    <li>Dashboard</li>
                    <li></li>
                </ul>
                <ul>
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                    <li>
                        <Link to={"/register"}>Register</Link>
                    </li>
                    <li></li>
                </ul>
            </nav>
        </>
    );
}
