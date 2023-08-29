// ThemeProvider.js
import { createContext, useContext, useEffect, useState } from "react";
import { handleThemeChange, getCurrentTheme } from "../helper/utils";
import { MUITheme } from "../main";

export const ThemeContext = createContext("dark");

export function useTheme() {
  return useContext(ThemeContext);
}

export function TThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(getCurrentTheme);

  useEffect(() => {
    let storedTheme = localStorage.getItem("theme");
    if (!storedTheme) {
      localStorage.setItem("theme", getCurrentTheme());
      setTheme(getCurrentTheme());
      storedTheme = getCurrentTheme();
    }

    handleThemeChange(storedTheme);
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      MUITheme().palette.mode = "light";
      setTheme("light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      MUITheme().palette.mode = "dark";
      setTheme("dark");
    }
  };

  const contextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}
