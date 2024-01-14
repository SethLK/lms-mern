import Cookies from "js-cookie";

export default function IsAdmin() {
    const userString = Cookies.get("user");
    const user = JSON.parse(userString);

    if (user.role != "admin") {
        return (
            <>
                <h1>Your are not admin</h1>
            </>
        );
    } else {
        return (
            <h1>Welcome admin</h1>
        );
    }
}