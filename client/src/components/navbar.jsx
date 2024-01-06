import "../../public/navbar/style.css";
import { Link } from "react-router-dom";
import { useUser } from '../myhooks/UserContent';

export default function NavBar() {
    const { userData } = useUser();

    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li>
                        <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li>
                        <Link to={"/profile"}>Profile</Link>
                    </li>
                </ul>
                <ul>
                    {userData ? (
                        <li>
                            <Link to={"/logout"}>Log out</Link>
                        </li>
                    ) : (
                        <>
                            <li>
                                <Link to={"/login"}>Login</Link>
                            </li>
                            <li>
                                <Link to={"/register"}>Register</Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </>
    );
}
