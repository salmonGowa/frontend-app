import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import UserPage from "./components/UserPage";
import AlbumDetailPage from "./components/AlbumDetailPage";
import PhotoDetailPage from "./components/PhotoDetailPage";
import Spinner from "./components/Spinner";
import Navbar from "./components/Navbar"; 

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Simulate an async operation to check user login status
    const loggedUser = localStorage.getItem("user");

    setTimeout(() => {
      if (loggedUser) {
        setUser(JSON.parse(loggedUser));
      }
      setLoading(false);
    }, 1000); // Simulate loading delay
  }, []);

  const handleLoginSuccess = (userData) => {
    // Update the user state when login is successful
    setUser(userData);
    setLoading(false);
  };

  if (loading) {
    return <Spinner />; // Show loading spinner while determining user state
  }

  return (
    <Router>
      {/* Navbar should be rendered only if user is logged in */}
      {user && <Navbar user={user} onLogout={() => setUser(null)} />} 
      
      <div className="mt-16">
        <Routes>
          {/* If there's no user logged in, show LoginPage */}
          {!user ? (
            <Route path="*" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
          ) : (
            <>
              <Route path="/" element={<HomePage />} />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/album/:albumId" element={<AlbumDetailPage />} />
              <Route path="/photo/:photoId" element={<PhotoDetailPage />} />
              <Route path="/user/:userId/album/:albumId" element={<AlbumDetailPage />} />
              <Route path="/album/:albumId/photo/:photoId" element={<PhotoDetailPage />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
