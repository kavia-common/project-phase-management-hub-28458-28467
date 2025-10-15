import React, { createContext, useContext, useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * ThemeProvider
 * Provides a minimal theme context primarily for future extension (e.g., dark mode).
 * Currently sets CSS variables defined in index.css and exposes toggle for dark mode (not persisted).
 */
export const ThemeContext = createContext({
  mode: 'light',
  toggle: () => {},
});

// PUBLIC_INTERFACE
export function ThemeProvider({ children }) {
  /** This is a public function. */
  const [mode, setMode] = useState('light');

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
  }, [mode]);

  const toggle = () => setMode(m => (m === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// PUBLIC_INTERFACE
export function useTheme() {
  /** Access theme context. */
  return useContext(ThemeContext);
}
