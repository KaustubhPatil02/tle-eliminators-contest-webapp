import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import ContestCard from "./ContestCard";

const ContestList = ({ title, contests }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="mb-12">
      <h2 className={`text-3xl font-bold mb-6 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contests.length > 0 ? (
          contests.map((contest) => <ContestCard key={contest.title} contest={contest} />)
        ) : (
          <p className="text-center col-span-3 text-gray-500 dark:text-gray-400">
            No contests available
          </p>
        )}
      </div>
    </div>
  );
};

export default ContestList;
