import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

const getIntialiDarkMode = () => {
  const preferDarkMode = window.matchMedia(
    "(prefer-color-scheme:dark)"
  ).matches;
  let storedDarkMode = localStorage.getItem("darkTheme") === "true";
  console.log(storedDarkMode);
  return storedDarkMode || preferDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getIntialiDarkMode());
  const [searchTerm, setSearchTerm] = useState("cat");

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };
  useEffect(() => {
    document.body.classList.toggle("dark-theme", isDarkTheme);
  }, [isDarkTheme]);
  return (
    <AppContext.Provider
      value={{ toggleDarkTheme, isDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
// let apikey = TM9mTMw7KgQxqgT9Yf-t9-WPigkUWptr_QmPGsfXw7g;
