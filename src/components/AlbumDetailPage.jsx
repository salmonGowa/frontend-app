import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Spinner from "./Spinner"; 

const AlbumDetailPage = () => {
  const { albumId } = useParams(); // Get the albumId from URL params
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch album details and photos
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      .then((response) => {
        setAlbum(response.data);
        return axios.get(
          `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`
        );
      })
      .then((response) => {
        setPhotos(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching album or photos:", error);
        setLoading(false);
      });
  }, [albumId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="p-6">
      {album && (
        <>
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-4">
            {album.title}
          </h1>
          <h2 className="text-2xl font-semibold mb-4">Photos:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo) => (
              <Link
                key={photo.id}
                to={`/album/${albumId}/photo/${photo.id}`}
                className="border p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition-shadow"
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="rounded-lg mb-2"
                />
                <h3 className="text-xl font-semibold text-blue-500 hover:underline">
                  {photo.title}
                </h3>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AlbumDetailPage;
