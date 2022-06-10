import { createTheme } from "@mui/material";
import { cyan, lime } from "@mui/material/colors";

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: lime[400],
    },
    secondary: {
      main: cyan[400],
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: lime[400],
    },
    secondary: {
      main: cyan[400],
    },
  },
});
