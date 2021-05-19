import { useState } from "react";

export const useDarkMode = () => {
  const { localStorage } = window;
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  const toggleTheme = (mode) => {
    localStorage.setItem("theme", mode);
    setTheme(mode);
  };

  return [theme, toggleTheme];
};
