import NavBar from "../../components/navbar";
import Cookies from "js-cookie";

export default function AdminPanel() {
    const userString = Cookies.get("user");
    const user = userString ? JSON.parse(userString) : null;

    if (user.role != "admin") {
        return (
            <>
                <h1>Your are not admin</h1>
            </>
        );
    } else {
        return (
            <>
                <NavBar />
                <div className="body">
                    <h1>Welcome admin</h1>
                </div>
            </>
        );
    }
}