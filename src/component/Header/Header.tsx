import React from "react";
// * Mui component
import {
  AppBar,
  Typography,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Box,
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

const Header = () => {
  return (
    <div>
      <AppBar position="sticky" color="primary">
        {/* <Container maxWidth="xl"> */}
        <HeaderWraper>
          <LogoTitle sx={{ display: { xs: "none", md: "flex" } }}>
            <Home />
            <Typography variant="h5" color="white">
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
              //   value={}
              //   onChange={}

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
              <StarBorderOutlined />
            </Box>
            <Box>
              <ShoppingCart />
            </Box>
          </FavCartContainer>

          <UserContainer>
            <PersonOutlined />
            <Typography variant="subtitle2" color="initial">
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

      <Box className="directionsBox" sx={{ backgroundColor: "red" }}>
        <div>Links</div>
        <FavCartContainer sx={{ display: { xs: "flex", md: "none" } }}>
          <Box>
            <StarBorderOutlined />
          </Box>
        </FavCartContainer>
      </Box>
    </div>
  );
};

export default Header;
