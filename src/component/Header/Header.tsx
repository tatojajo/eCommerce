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
  Search,
  Menu,
  StarBorderOutlined,
  ShoppingCart,
  Clear,
  Star,
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

const Header = () => {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  const user: User = JSON.parse(localStorage.getItem("User") as string);

  const startIndex = (pageNumber - 1) * 12;

  const handleChange = (e: any) => {
    if (searchValue.length > 2 || searchValue.length === 0)
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

  const handleUserMenu = () => {
    setIsUserMenuOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setIsUserMenuOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setIsUserMenuOpen(false);
    } else if (event.key === "Escape") {
      setIsUserMenuOpen(false);
    }
  }

  const prevOpen = useRef(isUserMenuOpen);
  useEffect(() => {
    if (prevOpen.current === true && isUserMenuOpen === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = isUserMenuOpen;
  }, [isUserMenuOpen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory.value && pageNumber > 1) {
          const getSearchedNextpageProducts = async () => {
            const { data } = await getSearchedProductsNextPage(
              debouncedValue || selectedCategory.value,
              startIndex
            );

            dispatch(searchedProductsNextPage(data.products));
          };
          getSearchedNextpageProducts();
        } else if (debouncedValue.length > 2 || selectedCategory.value) {
          const searchedProducts = async () => {
            const { data } = await getSearchedProducts(
              debouncedValue || selectedCategory.value
            );
            dispatch(saveSearchedProducts(data.products, data.total_found));
          };
          searchedProducts();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log("hello");
  }, [debouncedValue, startIndex, selectedCategory.value]);

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
                <Menu />
              </IconButton>
            </Box>

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
                          <Search />
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
                  <IconButton>
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
                  onClick={handleUserMenu}
                >
                  <MenuItem>
                    <Avatar>{user?.firstName[0]}</Avatar>
                  </MenuItem>
                  <Typography variant="body2">{user?.firstName}</Typography>
                </Button>
                <Popper
                  open={isUserMenuOpen}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom-start"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={isUserMenuOpen}
                            id="user-menu"
                            aria-labelledby="user-menu-button"
                            onKeyDown={handleListKeyDown}
                          >
                            <MenuItem
                              onClick={() => {
                                isAuthenticated().isUser && navigate("/user");
                                setIsUserMenuOpen(false);
                              }}
                            >
                              My account
                            </MenuItem>
                            <MenuItem>
                              {" "}
                              {isAuthenticated().isUser && (
                                <MenuItem
                                  onClick={() => {
                                    handleLogout();
                                    navigate("/");
                                  }}
                                >
                                  {t("global.logout")}
                                </MenuItem>
                              )}
                            </MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </Box>
              <SignIn open={isSignInOpen} setOpen={setIsSignInOpen} />
            </UserContainer>
          </HeaderWraper>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
