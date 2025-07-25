import { useEffect, useState } from "react";
import { ThemeContext } from "./index.js";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const userPreferredTheme =
      window.matchMedia("(prefers-color-scheme: dark)").matches === true
        ? "dark"
        : "light";

    const storedTheme = localStorage.getItem("theme") || userPreferredTheme;

    if (storedTheme) {
      document.documentElement.className = storedTheme;
      setTheme(storedTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.className = newTheme;
  };

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};
