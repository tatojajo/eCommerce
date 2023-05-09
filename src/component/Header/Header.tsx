import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";

// * Mui component
import {
  AppBar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Badge,
} from "@mui/material";
// *  styles
import {
  CategoriesBtn,
  FavCartContainer,
  HeaderWraper,
  LinksContainer,
  LogoTitle,
  NavbarLink,
  SearchBar,
  UserContainer,
} from "./HeaderStyle";

// * icons
import {
  Home,
  ArrowDownwardOutlined,
  Search,
  PersonOutlined,
  Menu,
  StarBorderOutlined,
  ShoppingCart,
} from "@mui/icons-material";
import SignIn from "../../pages/SignIn";

const Header = () => {
  const [open, setOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cartItems);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const toggle = setOpen((prev) => !prev);
    return toggle;
  };

  return (
    <Box>
      <AppBar color="primary" >
        {/* <Container maxWidth="xl"> */}
        <HeaderWraper>
          <LogoTitle
            sx={{ display: { xs: "none", md: "flex" } }}
            onClick={() => navigate("/")}
          >
            <IconButton>
              <Home />
            </IconButton>
            <Typography variant="h5" color="white" sx={{ cursor: "pointer" }}>
              T-shop
            </Typography>
          </LogoTitle>

          <Box>
            <IconButton sx={{ display: { xs: "flex", md: "none" } }}>
              <Menu />
            </IconButton>
          </Box>

          <LinksContainer sx={{ display: { xs: "none", md: "flex" } }}>
            <NavbarLink to="/">Contact</NavbarLink>
            <NavbarLink to="/">About US</NavbarLink>
          </LinksContainer>

          <CategoriesBtn sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography variant="subtitle2" color="black">
              Categories
            </Typography>
            <ArrowDownwardOutlined />
          </CategoriesBtn>

          <SearchBar>
            <TextField
              id=""
              label=""
              variant="standard"
              // value={searchValue}
              // onChange={handleSearch}

              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </SearchBar>

          <FavCartContainer>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <IconButton>
                <StarBorderOutlined />
              </IconButton>
            </Box>
            <Box>
              <IconButton onClick={() => navigate("/cart")}>
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCart />
                </Badge>
              </IconButton>
            </Box>
          </FavCartContainer>

          <UserContainer>
            <PersonOutlined />
            <Typography
              variant="subtitle2"
              color="initial"
              onClick={handleSignIn}
            >
              <SignIn open={open} />
              SignIn
            </Typography>
          </UserContainer>
        </HeaderWraper>
        {/* </Container> */}
      </AppBar>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <LinksContainer>
          <NavbarLink style={{ color: "black" }} to="/">
            Contact
          </NavbarLink>
          <NavbarLink style={{ color: "black" }} to="/">
            About US
          </NavbarLink>
        </LinksContainer>
      </Box>

      <Box className="directionsBox" sx={{ backgroundColor: "red", marginTop:'64px' }}>
        <div>Links</div>
        <FavCartContainer sx={{ display: { xs: "flex", md: "none" } }}>
          <Box>
            <StarBorderOutlined />
          </Box>
        </FavCartContainer>
      </Box>
    </Box>
  );
};

export default Header;
