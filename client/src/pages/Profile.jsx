import React from 'react';
import { useUser } from './UserContext';

export default function Profile() {
  const { userData } = useUser();

  return (
    <>
      <h1>Profile</h1>
      {userData && (
        <>
          <p>Email: {userData.email}</p>
          {/* Display other user data */}
        </>
      )}
    </>
  );
}
