import { useUser } from "../myhooks/UserContent";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("")
    const [accessToken, setToken] = useState("");
    const { setUser, userData } = useUser({});
    const redirect = useNavigate()

    const handleUsername = (e) =>{
        setUsername(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if the password matches the confirmed password
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        // Clear any previous error
        setMessage("");

        try {
            const response = await fetch("http://localhost:3000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            })

            if(response.ok){
                const data = await response.json()
                setToken(data.accessToken);                
                // Add your registration logic here
                console.log("Registration successful");
                setMessage(data.message)
                setUser(data.user);
                redirect("/profile")
            }else {
                const errorData = await response.json();
                setMessage(errorData.message);
                console.error("Register failed", response.statusText);
             }
        } catch (error) {
            // Handle registration failure
            console.error("Error during registration", error);
        }
    };

    useEffect(() => {
        console.log("User data is", userData); // Log user data here
        console.log("Token is", accessToken);
      }, [accessToken, userData]);
      
    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        value={username}
                        onChange={handleUsername} />
                </label>
                <br />
                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange} />
                </label>
                <br />
                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange} />
                </label>
                <br />
                <label htmlFor="confirmPassword">
                    Confirm Password
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={handleConfirmPassword} />
                </label>
                <br />
                {message && <p style={{ color: 'red' }}>{message}</p>}
                <button type="submit">Register</button>
            </form>
            <Link to={"/"}>Back</Link>
        </>
    );
}
