import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ContestCard = ({ contest, fetchBookmarks }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkId, setBookmarkId] = useState(null);

  useEffect(() => {
    const checkIfBookmarked = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookmarks");
        const bookmark = res.data.find((bookmark) => bookmark.title === contest.title);
        if (bookmark) {
          setIsBookmarked(true);
          setBookmarkId(bookmark._id);
        }
      } catch (error) {
        console.error("Error checking bookmarks:", error);
      }
    };
    checkIfBookmarked();
  }, [contest.title]);

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        await axios.delete(`http://localhost:5000/api/bookmarks/${bookmarkId}`);
        toast.success("Bookmark removed!");
      } else {
        const res = await axios.post("http://localhost:5000/api/bookmarks", {
          title: contest.title,
          url: contest.url,
          startTime: contest.startTime,
          platform: contest.platform,
        });
        setBookmarkId(res.data._id);
        toast.success("Bookmark added!");
      }
      setIsBookmarked(!isBookmarked);
      if (fetchBookmarks) fetchBookmarks();
    } catch (error) {
      toast.error("Error updating bookmark!");
      console.error("Error bookmarking contest:", error);
    }
  };

  return (
    <div className="relative p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl border border-gray-200 dark:border-gray-700">
      {/* Platform & Title */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">{contest.platform}</h2>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{contest.title}</h3>
        </div>
        <button
          onClick={handleBookmark}
          className={`text-xl transition ${isBookmarked ? "text-yellow-500" : "text-gray-400"} hover:text-yellow-600`}
        >
          {isBookmarked ? "⭐" : "☆"}
        </button>
      </div>

      {/* Start Time */}
      <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm">Start: {contest.startTime}</p>

      {/* Buttons: View More & External Link */}
      <div className="mt-4 flex justify-between">
        <Link
          to={`/contest/${contest.slug || contest.title.replace(/\s+/g, "-").toLowerCase()}`}
          className="px-3 py-1.5 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition"
        >
          View More
        </Link>

        <a
          href={contest.url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm font-medium hover:bg-gray-800 transition"
        >
          Visit Site
        </a>
      </div>
    </div>
  );
};

export default ContestCard;