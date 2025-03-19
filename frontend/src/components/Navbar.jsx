import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import AuthButton from "./AuthBtn";
import { useState } from "react";

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle mobile menu

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 dark:bg-gray-800 shadow-md sticky top-0 z-50">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-900 dark:text-white">
        Contest Tracker
      </Link>

      {/* Hamburger Menu for Mobile */}
      <button
        className="sm:hidden text-gray-900 dark:text-white text-2xl"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>

      {/* Links and Actions */}
      <div
        className={`flex-col sm:flex-row sm:flex items-center space-y-4 sm:space-y-0 sm:space-x-4 fixed sm:static top-0 right-0 h-full sm:h-auto w-3/4 sm:w-auto bg-gray-100 dark:bg-gray-800 sm:bg-transparent sm:dark:bg-transparent p-6 sm:p-0 shadow-md sm:shadow-none transition-all duration-300 ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        {/* Close Button */}
        <button
          className="self-end text-gray-900 dark:text-white text-2xl mb-4 sm:hidden"
          onClick={() => setIsMenuOpen(false)}
        >
          ✕
        </button>

        {/* Bookmark Link */}
        <Link
          to="/bookmarks"
          className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-300 flex items-center justify-center"
        >
          <span className="block sm:hidden">✨</span>
          <span className="hidden sm:block">View Bookmarks</span>
        </Link>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Auth Button */}
        <AuthButton />

        {/* User Avatar */}
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