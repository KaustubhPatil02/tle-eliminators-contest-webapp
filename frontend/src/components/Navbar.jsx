import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthBtn";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md">
      <Link to="/">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contest Tracker</h1>
      </Link>
      <div className="flex items-center space-x-4">
        {/* Bookmark Link */}
        <Link
          to="/bookmarks"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300 flex items-center"
        >
          {/* Show icon on small screens */}
          <span className="block sm:hidden">
            {/* <i className="fas fa-bookmark"></i> */}
            ✨
          </span>
          {/* Show text on medium and larger screens */}
          <span className="hidden sm:block">View Bookmarks</span>
        </Link>
        <ThemeToggle />
        <AuthButton />
        {user && (
          <img
            src={user.photoURL || "https://avatars.dicebear.com/api/avataaars/anonymous.svg"}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;