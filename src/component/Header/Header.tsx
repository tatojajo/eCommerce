import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import SignIn from "../../pages/SignIn";

// * Mui component
import {
  AppBar,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Box,
  Badge,
  FormControl,
  
  NativeSelect,
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
import US from "../../images/us.svg";
import GE from "../../images/ge.svg";
import i18next from "i18next";

const Header = () => {
  const {t} = useTranslation()
  const [open, setOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cartItems);
  const navigate = useNavigate();

  const handleSignIn = () => {
    const toggle = setOpen((prev) => !prev);
    return toggle;
  };

  return (
    <Box>
      <AppBar color="primary">
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
            <NavbarLink to="/">{t("global.contact")}</NavbarLink>
            <NavbarLink to="/">{t("global.about")}</NavbarLink>
          </LinksContainer>

          <CategoriesBtn sx={{ display: { xs: "none", md: "flex" } }}>
            <Typography variant="subtitle2" color="black">
              {t('global.category')}
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

          <Box sx={{ minWidth: 50 }}>
            <FormControl fullWidth>
              <NativeSelect
                title="Select Language"
                
                defaultValue="ENG"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "ENG") {
                    i18next.changeLanguage("en");
                  } else if (value === "GEO") {
                    i18next.changeLanguage("ge");
                  }
                }}
              >
                <option value="ENG">ENG</option>
                <option value="GEO">GEO</option>
              </NativeSelect>
            </FormControl>
          </Box>

          <UserContainer>
            <PersonOutlined />
            <Typography
              variant="subtitle2"
              color="initial"
              onClick={handleSignIn}
            >
              <SignIn open={open} />
              {t('global.login')}
            </Typography>
          </UserContainer>
        </HeaderWraper>
        {/* </Container> */}
      </AppBar>
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        <LinksContainer>
          <NavbarLink style={{ color: "black" }} to="/">
          {t("global.contact")}
          </NavbarLink>
          <NavbarLink style={{ color: "black" }} to="/">
          {t("global.about")}
          </NavbarLink>
        </LinksContainer>
      </Box>

      <Box
        className="directionsBox"
        sx={{ backgroundColor: "red", marginTop: "64px" }}
      >
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
