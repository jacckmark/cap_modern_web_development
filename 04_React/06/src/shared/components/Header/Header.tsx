import { Box, AppBar, Typography, Tabs, Tab } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";
import { useState, SyntheticEvent, useEffect } from "react";

export const Header = () => {
  const [currentTab, setCurrentTab] = useState("/book-app/books");
  const location = useLocation();

  useEffect(() => {
    setCurrentTab(location.pathname);
  }, [location.pathname]);

  const handleChange = (event: SyntheticEvent, newValue: string) =>
    setCurrentTab(newValue);

  return (
    <Box mb={3}>
      <AppBar position="static">
        <Typography variant="h5" p={2}>
          Books App
        </Typography>
        <Tabs value={currentTab} onChange={handleChange} textColor="inherit">
          <Tab
            label="Book overview"
            to="/book-app/books"
            component={NavLink}
            value="/book-app/books"
          />
          <Tab
            label="New book"
            to="/book-app/book"
            component={NavLink}
            value="/book-app/book"
          />
          <Tab
            className="hidden"
            label=""
            value={currentTab}
            to={currentTab}
            component={NavLink}
          />
        </Tabs>
      </AppBar>
    </Box>
  );
};
