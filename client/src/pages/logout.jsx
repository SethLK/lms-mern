import { useUser } from "../myhooks/UserContent";
import { useNavigate } from "react-router-dom";

export default function Logout(){
    const { setUser, userData } = useUser({});
    setUser(null);
    const redirect = useNavigate()
    redirect("/")
}