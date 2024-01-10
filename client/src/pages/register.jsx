import { useUser } from "../myhooks/UserContent";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./style/register.css"

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [accessToken, setToken] = useState("");
    const { setUser, userData } = useUser({});
    const redirect = useNavigate();

    const handleUsername = (e) => {
        setUsername(e.target.value);
    };

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
            });

            if (response.ok) {
                const data = await response.json();
                setToken(data.accessToken);
                // Add your registration logic here
                console.log("Registration successful");
                setMessage(data.message);
                setUser(data.user);
                redirect("/profile");
            } else {
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
            <div className="register-form">
                <div className="register-card">
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit}>

                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={username}
                            onChange={handleUsername}
                            placeholder="Enter your Username" />
                        <i>Username</i>

                        <br />

                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            placeholder="Enter your Email" />
                        <i>Email</i>
                        <br />

                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter your password" />
                        <i>Password</i>
                        <br />

                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={handleConfirmPassword}
                            placeholder="ReEnter your password" />
                        <i>Confirm Password</i>
                        <br />
                        {message && <p style={{ color: 'red' }}>{message}</p>}
                        <button type="submit">Register</button>
                    </form>
                    <Link to={"/"}>Back</Link>
                </div>
            </div>
        </>
    );
}
