import React from 'react';
import { useUser } from '../myhooks/UserContent';
import { Navigate } from 'react-router-dom';
import NavBar from '../components/navbar';
import "../../public/style/profile.css"

export default function Profile() {
  const { userData } = useUser();

  if (!userData) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <NavBar />
      <div className="body">

        <div className="profile-container">
          <div className="profile-card">
            <h1>Profile</h1>
            {userData && (
              <>
              <p>Username: {userData.username}</p>
                <p>Email: {userData.email}</p>
                {/* Display other user data */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
