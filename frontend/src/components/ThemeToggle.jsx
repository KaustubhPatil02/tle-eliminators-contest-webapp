import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-6 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:scale-110 transition-all duration-300"
    >
      {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
    </button>
  );
};

export default ThemeToggle;
