import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accessToken, setToken] = useState("");
  const [message, setMessage] = useState("");

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
        setMessage(data.message);
      } else {
        const errorData = await response.json();
        setMessage(errorData.message); // Move setMessage outside the else block
        console.error("Login failed", response.statusText);
      }
    } catch (error) {
      setMessage("An error occurred during login");
      console.error("Error during login", error);
    }
  };

  useEffect(() => {
    console.log(`Token is ${accessToken}`);
  }, [accessToken]);

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        <br />
        {message && <p style={{ color: 'red' }}>{message}</p>}
        <button type="submit">Login</button>
      </form>
      <Link to={"/"}>Back</Link>
    </>
  );
}
