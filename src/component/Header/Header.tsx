import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { isAuthenticated } from "../../Helpers/Auth/isAuthenticated";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useDebounce from "../../Helpers/CustomHooks/useBoolean/useDebounce";

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
  Button,
  Container,
  Avatar,
} from "@mui/material";
// *  styles
import {
  FavCartContainer,
  HeaderWraper,
  LogoTitle,
  UserContainer,
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
import { useEffect, useState } from "react";
import {
  getSearchedProducts,
  getSearchedProductsNextPage,
} from "../../Helpers/Services/products";
import {
  changePageNumber,
  saveSearchedProducts,
  searchedProductsNextPage,
} from "../../pages/Home/redux/HomeActions/HomeActions";
import SignIn from "../../pages/SignIn";
import homeReducer from "../../pages/Home/redux/reducer";

const categories = [
  "Mobile Phones",
  "Laptops",
  "Tablets",
  "Headphones",
  "Cameras",
  "Gaming Consoles",
  "Smartwatches",
  "Printers",
  "Speakers",
  "Monitors",
  "Computer Accessories",
  "Networking Devices",
  "Home Appliances",
  "Smart Home Devices",
  "Wearable Devices",
  "Virtual Reality",
  "Car Electronics",
  "Audio Equipment",
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const debouncedValue = useDebounce(searchValue);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { cartItems, pageNumber, searchedResults, favorites } = useAppSelector(
    (state) => state.homeReducer
  );

  const user: User = JSON.parse(localStorage.getItem("User") as string);

  const handleChange = (e: any) => {
    if (searchValue.length > 2 || searchValue.length === 0)
      dispatch(changePageNumber(1));
    setSearchValue(e.target.value);
  };
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
  };
  const startIndex = (pageNumber - 1) * 12;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchedResults && pageNumber > 1) {
          const getSearchedNextpageProducts = async () => {
            const { data } = await getSearchedProductsNextPage(
              debouncedValue,
              startIndex
            );
            dispatch(searchedProductsNextPage(data.products));
          };
          getSearchedNextpageProducts();
        } else if (debouncedValue.length > 2) {
          const searchedproducts = async () => {
            const { data } = await getSearchedProducts(debouncedValue);
            dispatch(saveSearchedProducts(data.products, data.total_found));
          };
          searchedproducts();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedValue, startIndex]);

  return (
    <Box display="flex">
      <AppBar color="secondary">
        <Container maxWidth="xl">
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

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <TextField
                id="searcg"
                placeholder="Search Product"
                variant="standard"
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
              <TextField
                id="search category"
                select
                value={searchValue}
                onChange={handleSearchChange}
                defaultValue=""
                SelectProps={{
                  native: true,
                }}
                variant="standard"
                style={{
                  maxWidth: "110px",
                }}
              >
                <option disabled value="">
                  {t("global.category")}
                </option>
                {categories.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
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
                  if (!isAuthenticated().isUser) setOpen(true);
                  if (isAuthenticated().isUser) navigate("/user");
                }}
              >
                <IconButton>
                  <Avatar>{user?.firstName[0]}</Avatar>
                </IconButton>
                <Typography variant="body2">{user?.firstName}</Typography>
              </Box>
              {isAuthenticated().isUser ? (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                >
                  {t("global.logout")}
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    setOpen(true);
                    if (!open) navigate("/?login");
                  }}
                >
                  {t("global.login")}
                </Button>
              )}

              <SignIn open={open} setOpen={setOpen} />
            </UserContainer>
          </HeaderWraper>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
