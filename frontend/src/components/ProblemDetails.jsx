import { useEffect, useState } from "react";
import axios from "axios";

const ProblemDetails = ({ contestUrl, platform, onBack, contestTitle }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);
  const API = import.meta.env.VITE_BACKEND_URL;


  const normalizeTitle = (title) => {
    return title
      .toLowerCase()
      .trim()
      .normalize("NFD")
      .replace(/\s+/g, " ")
      .replace(/[^\w\s]/g, "");
  };

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const playlistIds = [
          "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB",
          "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr",
        ];

        let allVideos = [];

        for (const playlistId of playlistIds) {
          const response = await axios.get(
            "https://www.googleapis.com/youtube/v3/playlistItems",
            {
              params: {
                part: "snippet",
                playlistId,
                maxResults: 50,
                key: import.meta.env.VITE_YOUTUBE_API_KEY,
              },
            }
          );

          allVideos = [...allVideos, ...(response.data.items || [])];
        }

        if (allVideos.length === 0) {
          setVideo(null);
          return;
        }

        const contestKeyword = normalizeTitle(contestTitle);
        let matchingVideo = allVideos.find((video) =>
          normalizeTitle(video.snippet.title).includes(contestKeyword)
        );

        setVideo(matchingVideo || null);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error.response?.data || error.message);
      }
    };

    if (contestTitle) fetchVideo();
  }, [contestTitle]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}api/contest-problems`, {
          params: { contestUrl, platform },
        });
        setProblems(response.data.problems);
      } catch (error) {
        setError(error.response?.data?.error || "An error occurred while fetching problems.");
      } finally {
        setLoading(false);
      }
    };

    if (contestUrl) fetchProblems();
  }, [contestUrl, platform]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50 p-4">
      {/* <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl"> */}
 
      <div className="bg-white dark:bg-gray-800 p-8 w-full h-full min-h-screen flex flex-col shadow-lg overflow-auto text-gray-900 dark:text-gray-200">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:text-blue-600 transition duration-300 flex items-center space-x-2">
          <span>←</span> <span>Back to Contests</span>
        </button>

        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{contestTitle}</h1>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-300">Problems and Solutions</h2>

        {loading ? (
          <p className="text-gray-500">Loading problems...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : problems.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No problems found for this contest.</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
                <span className="text-gray-700 dark:text-gray-300">{index + 1}.</span>
                <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 dark:text-blue-400 transition duration-300 font-medium">
                  {problem.title}
                </a>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-700 dark:text-gray-300">Related YouTube Video</h2>
        {video ? (
          <div className="flex items-center space-x-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="w-20 h-20 rounded-lg shadow-md" />
            <div>
              <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`} target="_blank" rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 transition duration-300 text-lg font-semibold">
                {video.snippet.title}
              </a>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400">No related video found.</p>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;
