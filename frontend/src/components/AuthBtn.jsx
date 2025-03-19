import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signInWithGoogle, logout } from "../firebase/firebaseConfig";

const AuthButton = () => {
  const { user } = useContext(AuthContext);

  return (
    <button
      onClick={user ? logout : signInWithGoogle}
      className="flex items-center px-4 py-2 rounded bg-white text-gray-500 font-medium hover:bg-blue-600 hover:text-white transition duration-300"
    >
      {/* Google Logo */}
      {!user && (
        <img
          src="https://cdn.iconscout.com/icon/free/png-256/free-google-logo-icon-download-in-svg-png-gif-file-formats--youtube-pack-logos-icons-1721659.png"
          alt="Google Logo"
          className="w-5 h-5 mr-2"
        />
      )}
      {user ? "Logout" : "Login with Google"}
    </button>
  );
};

export default AuthButton;