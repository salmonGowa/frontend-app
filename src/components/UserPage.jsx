import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom"; 
import Spinner from "./Spinner"; 

const UserPage = () => {
  const { userId } = useParams(); 
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch user details
    axios
      .get(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then((response) => {
        setUser(response.data);
        return axios.get(
          `https://jsonplaceholder.typicode.com/albums?userId=${userId}`
        );
      })
      .then((response) => {
        setAlbums(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user or albums:", error);
        setLoading(false);
      });
  }, [userId]);

  
  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      {user && (
        <>
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
            {user.name}
          </h1>
          <div className="text-center mb-4">
            <p className="text-gray-700">Username: {user.username}</p>
            <p className="text-gray-700">Email: {user.email}</p>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Albums:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {albums.map((album) => (
              <div
                key={album.id}
                className="border p-4 rounded-lg shadow-md bg-white"
              >
                
                <Link
                  to={`/album/${album.id}`} 
                  className="text-xl font-semibold text-blue-500 hover:underline"
                >
                  {album.title}
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserPage;
