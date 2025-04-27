import { useEffect, useState, useContext } from "react";
import axios from "axios";
import ContestCard from "../components/ContestCard";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "../components/Navbar";

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const { theme } = useContext(ThemeContext);
  const frontendurl = import.meta.env.VITE_FRONTEND_URL;
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  const fetchBookmarks = async () => {
    try {
      const res = await axios.get(`${backendurl}api/bookmarks`);
      setBookmarks(res.data);
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
      {/* Navbar without extra padding */}
      <Navbar />

      <div className="container mx-auto px-6 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Bookmarked Contests</h1>

        {bookmarks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarks.map((bookmark) => (
              <ContestCard key={bookmark._id} contest={bookmark} fetchBookmarks={fetchBookmarks} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg">No bookmarked contests yet.</p>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
