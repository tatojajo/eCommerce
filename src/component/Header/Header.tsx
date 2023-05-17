import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

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
} from "@mui/icons-material";
import i18next from "i18next";

type NavbarProps = {
  setOpen: Function;
};
const categories = [
  "Mobile Phones",
  "Laptops",
  "Tablets",
  "Televisions",
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
  "Drones",
  "Car Electronics",
  "Audio Equipment",
];

const Header = ({ setOpen }: NavbarProps) => {
  // const [searchValue, setSearchValue] = useState<string>("");
  // const debouncedValue = useDebounce(searchValue);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const cartItems = useAppSelector((state) => state.cartItems);
  const navigate = useNavigate();

  // const startIndex = (pageNumber - 1) * 12;

  return (
    <Box>
      <AppBar color="primary">
        {/* <Container maxWidth='lg'> */}
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
              // value={}
              // onChange={}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="search category"
              select
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
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate("/signin");
                setOpen(true);
              }}
            >
              {t("global.login")}
            </Button>
          </UserContainer>
        </HeaderWraper>
        {/* </Container> */}
      </AppBar>

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
