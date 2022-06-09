import React, { useContext } from "react";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ThemeContext } from "./ThemeProvider";

export const CustomButton = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <Button
      variant="contained"
      color="warning"
      type="submit"
      endIcon={<SendIcon />}
      onClick={toggleTheme}
    >
      Apply
    </Button>
  );
};
