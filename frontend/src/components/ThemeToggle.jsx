import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 py-2 rounded-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white hover:scale-110 transition-all duration-300 flex items-center justify-center"
    >
      {/* Show text on medium and larger screens */}
      <span className="hidden sm:block">
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </span>
      {/* Show only icons on small screens */}
      <span className="block sm:hidden">
        {theme === "light" ? "🌙" : "☀️"}
      </span>
    </button>
  );
};

export default ThemeToggle;