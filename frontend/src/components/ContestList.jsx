import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ContestCard from "./ContestCard";
import ProblemDetails from "./ProblemDetails"; // Import the component

const ContestList = ({ title, contests }) => {
  const { theme } = useContext(ThemeContext);
  const [selectedContestUrl, setSelectedContestUrl] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Calculate total pages
  const totalPages = Math.ceil(contests.length / itemsPerPage);

  // Get contests for the current page
  const currentContests = contests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="mb-12">
      <h2 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>

      {selectedContestUrl ? (
        <ProblemDetails contestUrl={selectedContestUrl} onBack={() => setSelectedContestUrl(null)} />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentContests.length > 0 ? (
              currentContests.map((contest) => (
                <ContestCard key={contest.title} contest={contest} onSelectContest={setSelectedContestUrl} />
              ))
            ) : (
              <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
                No contests available
              </p>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-4 py-2 mx-1 rounded-md ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ContestList;