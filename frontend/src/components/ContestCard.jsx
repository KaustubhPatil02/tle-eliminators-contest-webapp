import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

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
    <div className="relative p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center mb-3">
      <div className="flex flex-col items-start gap-2 sm:gap-4">
  <h2 className="text-l font-semibold text-gray-900 dark:text-white">({contest.platform})</h2>
  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{contest.title}</h3>
</div>

        <button 
          onClick={handleBookmark}
          className={`ml-4 px-3 py-1 rounded-lg text-lg transition-all duration-300 ${isBookmarked ? "text-yellow-500" : "text-gray-500"} hover:text-yellow-600`}
        >
          {isBookmarked ? "⭐" : "☆"}
        </button>
      </div>
      <p className="text-gray-700 dark:text-gray-300">{contest.startTime}</p>
      <a 
        href={contest.url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="mt-4 block text-blue-600 dark:text-blue-400 font-medium underline hover:text-blue-800 transition duration-300"
      >
        View Contest
      </a>
    </div>
  );
};

export default ContestCard;
