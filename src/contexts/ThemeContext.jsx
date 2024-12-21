import React, { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext();

// Define light and dark themes with CSS variables
const themes = {
  light: {
    "--background-color": "#ffffff",
    "--text-color": "#000000",
  },
  dark: {
    "--background-color": "#121212",
    "--text-color": "#ffffff",
  },
};

export function ThemeProvider({ children }) {
  // Initialize theme from localStorage or fallback to system preference
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme;
    }
    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    return systemPreference;
  });

  useEffect(() => {
    const root = document.documentElement;

    // Set the data-theme attribute for theming
    root.setAttribute("data-theme", theme);

    // Apply theme CSS variables
    const themeVariables = themes[theme] || themes.light;
    for (const [key, value] of Object.entries(themeVariables)) {
      root.style.setProperty(key, value);
    }

    // Save the selected theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Optional: Listen to system preference changes dynamically
  useEffect(() => {
    const systemPreferenceListener = (e) => {
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", systemPreferenceListener);

    return () => mediaQuery.removeEventListener("change", systemPreferenceListener);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Hook to use the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
