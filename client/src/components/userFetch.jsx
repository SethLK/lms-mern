import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function UserFetch() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users");
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
    <div>
      <h2>User Data:</h2>
      <ul>
        {userData.map((user) => (
          <li key={user._id}>{user.username}</li>
        ))}
      </ul>
    </div>
    <Link to={"/"}>Back</Link>
    </>
  );
}

export default UserFetch;
