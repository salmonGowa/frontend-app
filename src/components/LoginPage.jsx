import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User Info:", result.user);

      // Save the user session
      localStorage.setItem("user", JSON.stringify(result.user));
      alert("Login successful!");

      // Trigger parent callback to update user state
      onLoginSuccess(result.user);

      // Redirect to Home page
      navigate("/"); 

    } catch (error) {
      console.error("Error logging in:", error);
      alert("Login failed!");
    }
  };

  return (
    <div className="max-w-6xl px-4 mx-auto md:max-w-4xl sm:max-w-2xl sm:px-6">
      <div className="text-center mt-[185px]">
        <h1 className="max-w-md mx-auto text-3xl font-extrabold tracking-normal text-gray-900 sm:text-3xl md:text-5xl lg:text-6xl md:leading-none sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <span className="block">Welcome to Savannah Albums.</span>
        </h1>
        <p className="mt-4 text-gray-700 text-lg leading-relaxed">
          A modern, user-friendly app to explore and manage albums, users, and
          photos. View user profiles, explore albums, and edit photo details
          seamlessly.
        </p>
        <p className="mt-4 text-gray-600">
          Log in to unlock all features and dive into a seamless album
          management experience!
        </p>
        <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
          <div className="rounded-full shadow">
            <button
              onClick={handleLogin}
              type="button"
              className="flex items-center justify-center w-full px-8 py-3 text-base font-normal text-white bg-teal-400 border border-transparent rounded-full text-md hover:bg-teal-300 md:py-4 md:text-2xl md:px-10"
            >
              Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
