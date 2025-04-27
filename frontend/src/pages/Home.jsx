import { useEffect, useState, useContext } from "react";
import axios from "axios";
import PlatformSelector from "../components/PlatformSelector";
import ContestList from "../components/ContestList";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import AuthButton from "../components/AuthBtn";

const Home = () => {
  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [selectedPlatforms, setSelectedPlatforms] = useState(["leetcode"]);
  const [upcomingContests, setUpcomingContests] = useState([]);
  const [pastContests, setPastContests] = useState([]);
  const backendurl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    if (user) {
      const fetchContests = async () => {
        try {
          const upcoming = [];
          const past = [];
          for (const platform of selectedPlatforms) {
            const res = await axios.get(`${backendurl}api/${platform}-contests`);
            upcoming.push(...res.data.upcomingContests);
            past.push(...res.data.pastContests);
          }
          setUpcomingContests(upcoming);
          setPastContests(past);
        } catch (error) {
          console.error("Error fetching contests:", error);
        }
      };
      fetchContests();
    }
  }, [selectedPlatforms, user]);

  // 🛑 If user is not logged in, show the login screen
  if (!user) {
    return (
      <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-white"}`}>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-center">Contest Tracker</h1>
          <p className="text-center mt-2 text-gray-500 dark:text-gray-400">Log in to view upcoming contests.</p>
          <div className="mt-6 flex justify-center cursor-pointer">
            <AuthButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}>
      <Navbar />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Select Platforms</h2>
          <PlatformSelector selectedPlatforms={selectedPlatforms} setSelectedPlatforms={setSelectedPlatforms} />
        </div>
        <ContestList title="📢 Upcoming Contests" contests={upcomingContests} />
        <ContestList title="🎯 Previous Contests" contests={pastContests} />
      </div>
    </div>
  );
};

export default Home;