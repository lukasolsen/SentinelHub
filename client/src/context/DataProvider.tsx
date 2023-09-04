import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext({
  isLoggedIn: false,
  isLoading: false,
});

export function useData() {
  return useContext(DataContext);
}

export function DDataProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem("isLoggedIn") === "true" || false);
  }, []);

  const setLoggedIn = (value: boolean) => {
    sessionStorage.setItem("isLoggedIn", value.toString());
    setIsLoggedIn(value);
  };

  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };

  const setLoading = (value: boolean) => {
    setIsLoading(value);
  };

  const contextValue = {
    isLoggedIn,
    setLoggedIn,
    isLoading,
    toggleLoading,
    setLoading,
  };

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
