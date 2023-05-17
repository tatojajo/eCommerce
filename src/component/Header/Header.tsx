import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import useDebounce from "../../Helpers/CustomHooks/useBoolean/useDebounce";
import { isAuthenticated } from "../../Helpers/Auth/isAuthenticated";

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
  PersonOutlined,
  Menu,
  StarBorderOutlined,
  ShoppingCart,
  Clear,
} from "@mui/icons-material";
import i18next from "i18next";
import { useEffect, useState } from "react";
import {
  getSearchedProducts,
  getSearchedProductsNextPage,
} from "../../Helpers/Services/products";
import {
  saveSearchedProducts,
  searchedProductsNextPage,
} from "../../redux/HomeActions/HomeActions";
import SignIn from "../../pages/SignIn";

type NavbarProps = {
  setOpen: Function;
};
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
  const { cartItems, pageNumber, searchedResults, totalSearchedProducts } =
    useAppSelector((state) => state);

  const user: User = JSON.parse(localStorage.getItem("User") as string);
  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };
  const handleSearchChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchedResults && pageNumber > 1) {
          const getSearchedNextpageProducts = async () => {
            const { data } = await getSearchedProductsNextPage(
              debouncedValue,
              pageNumber
            );

            dispatch(searchedProductsNextPage(data.products));
          };
          getSearchedNextpageProducts();
        } else if (debouncedValue.length > 2) {
          const searchedproducts = async () => {
            const { data } = await getSearchedProducts(debouncedValue);
            console.log(data.products);
            dispatch(saveSearchedProducts(data.products, data.total_found));
          };
          searchedproducts();
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [debouncedValue, pageNumber]);

  return (
    <Box>
      <AppBar color="primary">
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
                  maxWidth: "100px",
                }}
              >
                <option disabled value="">
                  Category
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
              <Box display="flex" alignItems="center" onClick={()=>{
                if(isAuthenticated())navigate('/user')
                if(!isAuthenticated())setOpen(true)
              }}>
                <IconButton>
                  <Avatar>{user?.firstName[0]}</Avatar>
                </IconButton>
                <Typography variant="body2">{user?.firstName}</Typography>
              </Box>
              {isAuthenticated() ? (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => {
                    handleLogout();
                    navigate("/");
                  }}
                >
                  {t("global.logout")}
                </Button>
              ) : (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => {
                    setOpen(true);
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
