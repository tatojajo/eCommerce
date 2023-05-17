import { styled, Box, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";

export const HeaderWraper = styled(Toolbar)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const LogoTitle = styled(Box)`
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CategoriesBtn = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 2px solid black;
  background-color: #5bc0de;
  text-transform: none;
  padding: 3px 5px;
  border-radius: 50px;
  &:hover {
    background-color: #5cb85c;
  }
`;

export const LinksContainer = styled(Box)`
  width: 150px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NavbarLink = styled(Link)`
  text-decoration: none;
  color: white;
`;

export const SearchBar = styled(Box)`
  // width: 150px;
  // hwight: 50px;
  // border-left: 1px solid grey;
  // border-right: 1px solid grey;
  // border-top: 1px solid grey;
  // border-bottom: 1px solid white;
  // border-top-right-radius: 5px;
  // border-top-left-radius: 5px;
`;

export const FavCartContainer = styled(Box)`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const UserContainer = styled(Box)`
  width: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
