import React, { useState } from "react";
import { Box, AppBar, Typography, Tabs, Tab, Button } from "@mui/material";
import { Link } from "../Link/Link";
import AcUnitIcon from "@mui/icons-material/AcUnit";

export const Header: React.FC<{ onToggleTheme: () => void }> = ({
  onToggleTheme,
}) => {
  const [currentTab, setCurrentTab] = useState("/book-app/books");

  const handleChange = (event: React.SyntheticEvent, newTab: string) => {
    setCurrentTab(newTab);
  };

  return (
    <Box mb={3}>
      <AppBar position="static">
        <Typography variant="h5" p={2}>
          Books App
        </Typography>
        <Tabs value={currentTab} onChange={handleChange} textColor="inherit">
          <Tab
            label="Book Overview"
            value="/book-app/books"
            to="/book-app/books"
            component={Link}
          />
          <Tab
            label="New Book"
            value="/book-app/book"
            to="/book-app/book"
            component={Link}
          />
          <Tab
            label="User list"
            value="/users/list"
            to="/users/list"
            component={Link}
          />
          <Tab
            label="New User"
            value="/users/new"
            to="/users/new"
            component={Link}
          />
        </Tabs>
        <Button
          onClick={onToggleTheme}
          endIcon={<AcUnitIcon />}
          variant="contained"
        >
          change theme
        </Button>
      </AppBar>
    </Box>
  );
};
