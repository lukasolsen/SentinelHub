import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Slice/ThemeSlice";

const ThemeProvider = ({ children }) => {
  const isDarkTheme = useSelector((state) => state.isDarkTheme);
  const dispatch = useDispatch();

  return (
    <div className={isDarkTheme ? "dark" : ""}>
      {children}
      <button
        onClick={() => dispatch(toggleTheme())}
        className="fixed bottom-4 right-4 p-2 bg-gray-800 text-white rounded-full"
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemeProvider;
