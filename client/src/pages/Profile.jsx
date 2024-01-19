import React from 'react';
import { useUser } from '../myhooks/UserContent';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import "../style/profile.css";
import Cookies from 'js-cookie';

export default function Profile() {
  const { userData } = useUser();
  const userString = Cookies.get("user");
  
  if (!userString) {
    return <Navigate to="/login" />;
  }

  const User = JSON.parse(userString);

  return (
    <>
      <NavBar />
      <div className="body">
        <div className="profile-container">
          <div className="profile-card">
            <h1>Profile</h1>
            {User && (
              <>
                <p>Username: {User.username}</p>
                <p>Email: {User.email}</p>
                <p>Role: {User.role}</p>
                {/* <p>Token: {Cookies.get("jwt_token")}</p> */}
                {/* Display other user data */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
