import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signInWithGoogle, logout } from "../firebase/firebaseConfig";

const AuthButton = () => {
  const { user } = useContext(AuthContext);

  return (
    <button 
      onClick={user ? logout : signInWithGoogle}
      className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
    >
      {user ? "Logout" : "Login with Google"}
    </button>
  );
};

export default AuthButton;