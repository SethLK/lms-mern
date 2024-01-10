import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../myhooks/UserContent";
import { useNavigate } from "react-router-dom";
import "./style/login.css";
import Cookies from 'js-cookie';


export default function Login() {
  const redirect = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setToken] = useState("");
  const [message, setMessage] = useState("");
  const { setUser, userData } = useUser({});

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setToken(data.accessToken);
        Cookies.set("jwt_token", data.accessToken, { expires: 7, secure: true, sameSite: 'Lax' });
        
        setMessage(data.message);
        setUser(data.user);
        redirect("/profile");
      } else {
        const errorData = await response.json();
        setMessage(errorData.message);
        console.error("Login failed", response.statusText);
      }
    } catch (error) {
      setMessage("An error occurred during login");
      console.error("Error during login", error);
    }
  };

  useEffect(() => {
    console.log("User data is", userData); // Log user data here
    console.log("Token is", accessToken);
  }, [accessToken, userData]);

  return (
    <>
      <div className="login-form">

        <div className="login-card">
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
            />
            <i>Email</i>
            <br />

            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
            <i>Password</i>
            <br />
            {message && <p style={{ color: 'red' }}>{message}</p>}
            <button type="submit">Login</button>
            <Link to={"/"} className="link">Back</Link>
          </form>
        </div>
      </div>
    </>
  );
}
