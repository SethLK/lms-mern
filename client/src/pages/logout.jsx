import { useUser } from "../myhooks/UserContent";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Logout(){
    const { setUser, userData } = useUser({});
    setUser(null);
    Cookies.remove('jwt_token');
    const redirect = useNavigate()
    redirect("/")
}