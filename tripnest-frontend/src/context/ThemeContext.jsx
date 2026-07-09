import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Force dark mode as hero

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.add('dark'); // Ensure dark mode class is always on
  }, []);

  const toggleTheme = () => {
    // Keep it dark mode for hero, but let's toggle states if wanted.
    // For Anti-Gravity, dark void is primary, so we keep dark mode.
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
