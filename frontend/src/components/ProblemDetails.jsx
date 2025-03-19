import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

const ProblemDetails = ({ contestUrl, platform, onBack, contestTitle }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [video, setVideo] = useState(null);

  // Normalize function to handle video title and contest title comparison
  // const normalizeTitle = (title) => {
  //   return title.toLowerCase()
  //     .trim()
  //     .normalize()
  //     .replace(/\s+/g, " ") // Replace multiple spaces with one
  //     .replace(/[^\w\s]/g, ''); // Remove all special characters except letters and numbers
  // };

  const normalizeTitle = (title) => {
    return title
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading/trailing spaces
      .normalize("NFD") // Normalize Unicode characters (e.g., accents)
      .replace(/\s+/g, " ") // Replace multiple spaces with one
      .replace(/[^\w\s]/g, ''); // Remove all special characters except letters, numbers, and spaces
  };
  

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        console.log("Fetching YouTube videos for contest:", contestTitle);
  
        const playlistIds = [
          "PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB", // First playlist
          "PLcXpkI9A-RZI6FhydNz3JBt_-p_i25Cbr", // Second playlist
        ];
  
        let allVideos = [];
  
        // Fetch videos from both playlists
        for (const playlistId of playlistIds) {
          const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
            params: {
              part: "snippet",
              playlistId,
              maxResults: 50,
              key: import.meta.env.VITE_YOUTUBE_API_KEY, // Replace with your YouTube API key
            },
          });
  
          allVideos = [...allVideos, ...(response.data.items || [])];
        }
  
        if (allVideos.length === 0) {
          console.log("No videos found in playlists.");
          setVideo(null);
          return;
        }
  
        const contestKeyword = normalizeTitle(contestTitle);
        console.log("Normalized contest title:", contestKeyword);
  
        let matchingVideo = allVideos.find((video) => {
          const videoTitle = normalizeTitle(video.snippet.title);
          console.log("Normalized video title:", videoTitle);
  
          // Check for exact match
          if (videoTitle.includes(contestKeyword)) {
            return true;
          }
  
          // If no exact match, check for a looser match by splitting the contest title into keywords
          const contestKeywords = contestKeyword.split(" ");
          return contestKeywords.every((keyword) => videoTitle.includes(keyword));
        });
  
        console.log("Matching Video:", matchingVideo ? matchingVideo.snippet.title : "None Found");
        setVideo(matchingVideo || null);
      } catch (error) {
        console.error("Error fetching YouTube videos:", error.response?.data || error.message);
      }
    };
  
    if (contestTitle) fetchVideo();
  }, [contestTitle]);

  useEffect(() => {
    const fetchProblems = async () => {
      console.log("Fetching problems for contestUrl:", contestUrl, "platform:", platform);
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/contest-problems", {
          params: { contestUrl, platform },
        });
        setProblems(response.data.problems);
      } catch (error) {
        console.error("Error fetching contest problems:", error.response?.data || error.message);
        setError(error.response?.data?.error || "An error occurred while fetching problems.");
      } finally {
        setLoading(false);
      }
    };

    if (contestUrl) fetchProblems();
  }, [contestUrl, platform]);

  return (
    <div className="fixed inset-0 bg-gray-800  flex  z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <button onClick={onBack} className="mb-4 text-blue-500 underline">← Back to Contests</button>
        <h1 className="text-3xl font-bold mb-4">{contestTitle}</h1>
        <h2 className="text-2xl font-bold mb-4">Problems and Solutions</h2>

        {loading ? (
          <p>Loading problems...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : problems.length === 0 ? (
          <p>No problems found for this contest.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            {problems.map((problem, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300">{index + 1}.</span>
                <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">
                  {problem.title}
                </a>
              </li>
            ))}
          </ul>
        )}

        <h2 className="text-2xl font-bold mt-8 mb-4">Related YouTube Video</h2>
        {video ? (
          <div className="flex items-center space-x-4">
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} className="w-20 h-20 rounded-lg" />
            <div>
              <a href={`https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400 text-lg font-semibold">
                {video.snippet.title}
              </a>
              {/* <p className="text-gray-600 dark:text-gray-400">{video.snippet.description}</p> */}
            </div>
          </div>
        ) : (
          <p>No related video found.</p>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;