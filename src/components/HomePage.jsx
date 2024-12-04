import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; 
import Spinner from "./Spinner"; 

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [userAlbumsCount, setUserAlbumsCount] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch users from the JSONPlaceholder API
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        // Fetch albums count for each user
        response.data.forEach((user) => {
          fetchAlbums(user.id);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
  }, []);

  // Function to fetch albums count for a specific user
  const fetchAlbums = async (userId) => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
      );
      setUserAlbumsCount((prevState) => ({
        ...prevState,
        [userId]: response.data.length, // Update album count for the user
      }));
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  };

  // If loading, show the Spinner component
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">Users</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <Link
              to={`/user/${user.id}`} // Navigate to the user's page
              className="text-xl font-semibold text-blue-500 hover:underline"
            >
              {user.name}
            </Link>
            <p className="text-gray-700">Username: {user.username}</p>
            <p className="text-gray-700">Email: {user.email}</p>
            <p className="text-gray-700">
              Albums: {userAlbumsCount[user.id] || "Loading..."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
