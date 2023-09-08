import { FaBell, FaDatabase, FaMoon, FaSearch, FaSun } from "react-icons/fa";
import { useTheme } from "../context/TThemeProvider";
import { useEffect, useState } from "react";
import {
  checkLoggedIn,
  getUserInformation,
  searchReports,
} from "../service/api-service";
import { useNavigate } from "react-router-dom";
import { useData } from "../context/DataContext";

function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className="p-2 dark:text-white text-bodyTextWhite font-semibold rounded flex flex-row items-center"
      title="Toggle Theme"
      onClick={toggleTheme}
    >
      {theme === "dark" ? (
        <FaSun size={18} className="stroke-none hover:text-blue-400" />
      ) : (
        <FaMoon size={18} className="stroke-none hover:text-blue-400" />
      )}
    </button>
  );
}

export default function Navbar() {
  const { state, dispatch } = useData();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({} as any);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    checkLoggedIn().then((res) => {
      if (res) {
        setLoggedIn(true);

        getUserInformation().then((res) => {
          setUser(res.user);
          //setLoading(false);
        });
      }
    });
  }, []);

  const Search = async (e: SubmitEvent) => {
    e.preventDefault();

    dispatch({ type: "SET_SEARCH_TERM", payload: searchQuery });
    navigate("/search?query=" + searchQuery);
  };

  return (
    <nav className="border-b border-gray-700 w-full">
      <div className="px-2 flex flex-col md:flex-row justify-between items-center w-full">
        <div className="flex items-center justify-between w-full mb-4 md:mb-0">
          <div className="mr-6 border-r border-r-gray-200 p-2">
            <a href="/">
              <img src="https://via.placeholder.com/50" alt="logo" />
            </a>
          </div>

          <div className="flex items-center flex-grow">
            {" "}
            {/* Use flex-grow */}
            <input
              type="text"
              placeholder="Search"
              value={searchQuery || state.searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border-0 bg-transparent focus:border-0 focus:outline-none w-64 text-bodyTextWhite dark:text-white rounded-sm w-full"
            />
            <div>
              <button
                className="p-2 dark:text-white text-bodyTextWhite font-semibold rounded flex flex-row items-center"
                type="submit"
                onClick={Search}
              >
                <FaSearch
                  size={18}
                  className={"hover:text-blue-400 mr-2 ml-4"}
                />
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-2 ml-auto">
            {/* Add "Browse" button */}
            <div>
              <a
                href="/browse"
                className="p-2 dark:text-white text-bodyTextWhite font-semibold rounded flex flex-row items-center"
              >
                <FaDatabase size={18} className={"hover:text-blue-400"} />
              </a>
            </div>
            <div>
              {/* Add "Alerts" button */}
              <a
                href="/alerts"
                className="p-2 dark:text-white text-bodyTextWhite font-semibold rounded flex flex-row items-center"
              >
                <FaBell size={18} className={"hover:text-blue-400"} />
              </a>
            </div>

            <ThemeSwitcher />

            {loggedIn && (
              <div className="flex items-center">
                <a href={`/profile/${user?._id}`}>
                  <img
                    src="https://via.placeholder.com/50"
                    alt="profile"
                    className="rounded-full"
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
