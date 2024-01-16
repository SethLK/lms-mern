import "../../public/navbar/style.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavBar() {
    const userString = Cookies.get("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!userString || !user) {
        // Handle the case where userString is undefined or user is null
        return (
            <>
                <nav>
                    {/* Your navigation items when user is not logged in */}
                    <ul>
                        <li>
                            <Link to={"/"}>Home</Link>
                        </li>

                    </ul>
                    <ul>
                        <li>
                            <Link to={"/login"}>Login</Link>
                        </li>
                        <li>
                            <Link to={"/register"}>Register</Link>
                        </li>
                    </ul>
                </nav>
            </>
        );
    }

    // Continue with your original logic for logged-in users
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to={"/"}>Home</Link>
                    </li>
                    {userString && (
                        <>
                            <li>
                                <Link to={"/dashboard"}>Dashboard</Link>
                            </li>
                            {user && (
                                <>
                                    {user.role === 'admin' ? (
                                        <li>
                                            <Link to={"/admin"}>Admin Panel</Link>
                                        </li>
                                    ) : user.role === 'instructor' ? (
                                        <li>
                                            <Link to={"/instructor"}>Instructor Panel</Link>
                                        </li>
                                    ) : null}
                                    <li>
                                        <Link to={"/profile"}>Profile</Link>
                                    </li>
                                </>
                            )}
                        </>
                    )}
                </ul>
                <ul>
                    <li>
                        <Link to={"/logout"}>Log out</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}
