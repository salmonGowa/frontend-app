import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PhotoDetailPage = () => {
  const { photoId } = useParams(); 
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    // Fetch photo details
    axios
      .get(`https://jsonplaceholder.typicode.com/photos/${photoId}`)
      .then((response) => {
        setPhoto(response.data);
        setNewTitle(response.data.title); // Initialize with the current title
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching photo details:", error);
        setLoading(false);
      });
  }, [photoId]);

  const handleSave = () => {
    if (!newTitle.trim()) return;

    axios
      .patch(`https://jsonplaceholder.typicode.com/photos/${photoId}`, {
        title: newTitle,
      })
      .then((response) => {
        setPhoto((prevPhoto) => ({ ...prevPhoto, title: response.data.title }));
        setIsEditing(false); 
      })
      .catch((error) => {
        console.error("Error updating photo title:", error);
      });
  };

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="p-6">
      {photo && (
        <>
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
            Photo Details
          </h1>
          <div className="text-center">
            <img
              src={photo.url}
              alt={photo.title}
              className="rounded-lg mb-4 shadow-md mx-auto"
            />
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-semibold">{photo.title}</h2>
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
                >
                  Edit Title
                </button>
              </>
            ) : (
              <>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border rounded-lg px-4 py-2 mb-2"
                />
                <div>
                  <button
                    onClick={handleSave}
                    className="mr-2 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded shadow hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default PhotoDetailPage;
