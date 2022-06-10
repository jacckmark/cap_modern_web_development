import { styled } from "@mui/material";
import { NavLink } from "react-router-dom";

export const Link = styled(NavLink)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.secondary.main,
  },
}));
