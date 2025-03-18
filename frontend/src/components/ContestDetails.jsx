import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ContestDetails = () => {
  const { id } = useParams(); 
  const [contest, setContest] = useState(null);
  const [problems, setProblems] = useState([]); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/leetcode-contest/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Optional if API requires auth
          },
        });
        setContest(res.data);
        setProblems(res.data.problems || []); 
      } catch (error) {
        console.error("Error fetching contest details:", error);
        setError(error.response?.data?.error || "An error occurred while fetching contest details.");
      }
    };

    fetchContest();
  }, [id]);

  if (error) {
    return <div className="text-center text-red-500 dark:text-red-400">{error}</div>;
  }

  if (!contest) {
    return <div className="text-center text-gray-500 dark:text-gray-400">Loading...</div>;
  }

  const isPastContest = new Date(contest.end_time) < new Date();

  return (
    <div className="min-h-screen flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{contest.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">{contest.description || "No description available."}</p>
        <p className="mt-4 text-lg font-semibold text-gray-700 dark:text-gray-300">Platform: {contest.platform}</p>
        <p className="mt-2 text-gray-500 dark:text-gray-400">Start: {contest.start_time}</p>
        <p className="text-gray-500 dark:text-gray-400">End: {contest.end_time}</p>

        {isPastContest ? (
          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Problems</h3>
            {problems.length > 0 ? (
              <ul className="mt-2 space-y-2">
                {problems.map((problem, index) => (
                  <li key={index} className="p-3 bg-gray-200 dark:bg-gray-700 rounded-md">
                    <a href={problem.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                      {problem.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">No problems found for this contest.</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mt-4">This is an upcoming contest. Problems will be available after the contest ends.</p>
        )}

        <div className="mt-6 flex justify-between">
          <Link to="/" className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">Back</Link>
          <a href={contest.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">Go to Contest</a>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
