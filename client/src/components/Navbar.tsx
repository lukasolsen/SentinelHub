import { FaMoon, FaSun, FaSearch } from "react-icons/fa";
import { useTheme } from "../context/TThemeProvider";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="p-2 md:p-0 mr-4 md:mr-6"
      title="Toggle Theme"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <FaSun size={20} className="dark:text-white stroke-none" />
      ) : (
        <FaMoon size={20} className="dark:text-white stroke-none" />
      )}
    </button>
  );
}

export default function Navbar() {
  return (
    <nav className="border-t-2 border-blue-500">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 md:px-12">
        <div className="flex items-center justify-between w-full mb-4 md:mb-0">
          <div className="mr-6 border-r border-r-gray-200 p-2">
            <a href="/">
              <img src="https://via.placeholder.com/50" alt="logo" />
            </a>
          </div>
          {/* Search Input with a button */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="p-2 border-0 bg-transparent focus:border-0 focus:outline-none w-32 md:w-64 text-bodyTextWhite dark:text-white rounded-sm"
            />
            <button
              className="p-2 ml-2 bg-blue-500 hover:bg-blue-700 dark:text-white text-bodyTextWhite font-semibold rounded"
              title="Search"
            >
              <FaSearch />
            </button>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
}
