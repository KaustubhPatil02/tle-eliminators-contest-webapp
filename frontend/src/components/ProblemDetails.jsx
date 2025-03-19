import { useEffect, useState } from "react";
import axios from "axios";

const ProblemDetails = ({ contestUrl, platform, onBack }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      console.log("Fetching problems for contestUrl:", contestUrl, "platform:", platform); // Debugging
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

    if (contestUrl) {
      fetchProblems();
    }
  }, [contestUrl, platform]);

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <button onClick={onBack} className="mb-4 text-blue-500 underline">
          ← Back to Contests
        </button>
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
                <a
                  href={problem.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline dark:text-blue-400"
                >
                  {problem.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProblemDetails;