import { ThemeContext } from "./ThemeProvider";
import React, { useContext } from "react";
import { Theme } from "./ThemeProvider";

export const Title: React.FC<{ title: string }> = ({ title }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === Theme.LIGHT ? "white" : "black",
        color: theme === Theme.LIGHT ? "black" : "white",
      }}
    >
      {title}
    </div>
  );
};
