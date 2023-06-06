import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isAuthenticated } from "../../Helpers/Auth/isAuthenticated";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { options } from "./categories";
import useDebounce from "../../Helpers/CustomHooks/useBoolean/useDebounce";

// * Mui component
import {
  AppBar,
  Typography,
  InputAdornment,
  IconButton,
  Box,
  Badge,
  FormControl,
  NativeSelect,
  Button,
  Container,
  Avatar,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Divider,
  ListItemIcon,
  Menu,
} from "@mui/material";
// *  styles
import {
  FavCartContainer,
  HeaderWraper,
  LogoTitle,
  RoundedTextField,
  UserContainer,
  customStyles,
} from "./HeaderStyle";

// * icons
import {
  Home,
  Search as SearchIcon,
  StarBorderOutlined,
  ShoppingCart,
  Clear,
  Star,
  Logout,
  Menu as MenuIcon,
  PersonAdd,
  Settings,
} from "@mui/icons-material";
import i18next from "i18next";
import { useEffect, useRef, useState } from "react";
import {
  getSearchedProducts,
  getSearchedProductsNextPage,
} from "../../Helpers/Services/products";
import {
  changePageNumber,
  saveSearchedProducts,
  searchedProductsNextPage,
  setSelectedCategory,
} from "../../pages/Home/redux/HomeActions/HomeActions";
import SignIn from "../../pages/SignIn";
import Search from "../Search/Search";
import Favorites from "../../pages/Favorites";

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const [isFavOpen, setIsFavOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    cartItems,
    pageNumber,
    searchedResults,
    favorites,
    selectedCategory,
  } = useAppSelector<HomeState>((state) => state.homeReducer);

  const handleUserMenu = () => {
    setIsUserMenuOpen(true);
  };
  const handleCloseUserMenu = () => {
    setIsUserMenuOpen(false);
  };

  const user: User = JSON.parse(localStorage.getItem("User") as string);

  const startIndex = (pageNumber - 1) * 12;

  const handleChange = (e: any) => {
    if (searchValue.length < 2 || searchValue.length === 0) {
      dispatch(saveSearchedProducts([], 0));
    }
    dispatch(changePageNumber(1));
    setSearchValue(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
  };

  const handleSelectCategory = (value: any) => {
    console.log(value);
    dispatch(setSelectedCategory(value));
  };

  return (
    <Box display="flex">
      <AppBar color="secondary">
        <Container maxWidth="xl">
          <HeaderWraper>
            <LogoTitle
              sx={{ display: { xs: "none", md: "flex" } }}
              onClick={() => {
                dispatch(changePageNumber(1));
                setSearchValue("");
                dispatch(saveSearchedProducts([], 0));
                navigate("/");
              }}
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
                <MenuIcon />
              </IconButton>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",

                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <RoundedTextField
                  id="search"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {debouncedValue ? (
                          <IconButton
                            onClick={() => {
                              setSearchValue("");
                              dispatch(saveSearchedProducts([], 0));
                            }}
                          >
                            <Clear />
                          </IconButton>
                        ) : (
                          <IconButton>
                            <SearchIcon />
                          </IconButton>
                        )}
                      </InputAdornment>
                    ),
                  }}
                />
                <Select
                  options={options}
                  onChange={handleSelectCategory}
                  placeholder="Select category"
                  styles={customStyles}
                />
              </Box>
            </Box>

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
              <FavCartContainer>
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    onClick={() => {
                      setIsFavOpen(true);
                      navigate("/?favorites");
                    }}
                  >
                    <Badge badgeContent={favorites.length} color="success">
                      {favorites.length > 0 ? <Star /> : <StarBorderOutlined />}
                    </Badge>
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
              <Box
                display="flex"
                alignItems="center"
                onClick={() => {
                  if (!isAuthenticated().isUser) setIsSignInOpen(true);
                }}
              >
                <Button
                  ref={anchorRef}
                  id="user-menu-button"
                  aria-controls={isUserMenuOpen ? "user menu" : undefined}
                  aria-expanded={isUserMenuOpen ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={() => {
                    if (isAuthenticated().isUser) handleUserMenu();
                  }}
                >
                  <Avatar>{user?.firstName[0]}</Avatar>

                  <Typography ml={1} variant="body2">
                    {user?.firstName}
                  </Typography>
                </Button>
                {isAuthenticated().isUser && (
                  <Menu
                    anchorEl={anchorRef.current}
                    id="account-menu"
                    open={isUserMenuOpen}
                    onClose={handleCloseUserMenu}
                    onClick={handleCloseUserMenu}
                    PaperProps={{
                      elevation: 10,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem
                      onClick={() => {
                        isAuthenticated().isUser && navigate("/user");
                        setIsUserMenuOpen(false);
                      }}
                    >
                      <Avatar /> My account
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleCloseUserMenu}>
                      <ListItemIcon>
                        <Settings fontSize="small" />
                      </ListItemIcon>
                      Settings
                    </MenuItem>

                    <MenuItem
                      onClick={() => {
                        handleLogout();
                        navigate("/");
                      }}
                    >
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      {t("global.logout")}
                    </MenuItem>
                  </Menu>
                )}
              </Box>
              <SignIn open={isSignInOpen} setOpen={setIsSignInOpen} />
            </UserContainer>
          </HeaderWraper>
        </Container>
      </AppBar>
      <Box
        sx={{
          display: debouncedValue.length === 0 ? "none" : "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "start",
          flexDirection: "column",
          gap: "10px",
          position: "fixed",
          top: "60px",
          left: "50%",
          transform: " translate(-50%, 0%)",
          zIndex: 1,
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          padding: "20px",
        }}
        onClick={() => setSearchValue("")}
      >
        {searchValue && <Search debouncedValue={debouncedValue} />}
        {isFavOpen && (
          <Favorites isFavOpen={isFavOpen} setIsFavOpen={setIsFavOpen} />
        )}
      </Box>
    </Box>
  );
};

export default Header;
