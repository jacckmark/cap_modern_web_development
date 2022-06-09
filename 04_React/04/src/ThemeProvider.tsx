import React, { createContext, ReactNode, useState } from "react";

export enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

interface ThemeContextI {
  theme: Theme.DARK | Theme.LIGHT;
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as ThemeContextI);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme.LIGHT | Theme.DARK>(Theme.LIGHT);

  const toggleTheme = () =>
    setTheme((prevTheme: Theme.LIGHT | Theme.DARK) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
