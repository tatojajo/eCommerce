import {
  ContactPage,
  Facebook,
  FavoriteRounded,
  Home,
  Info,
  Instagram,
  LinkedIn,
} from "@mui/icons-material";
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import logo from "../../images/favicon.ico";

// import Google from './GoogleMap'

const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "150x",
        display: "flex",
        flexDirection: "column",
        padding: "25px 0px",
        borderTop: "2px solid",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <img src={logo} alt="T-Shop" width="40px" />
        <Typography variant="h1" color="initial">
          T-Shop
        </Typography>
      </Box>
      <List
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton>
          <ListItem>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItem>
        </IconButton>
        <IconButton>
          <ListItem>
            <ListItemIcon>
              <ContactPage />
            </ListItemIcon>
            <ListItemText>Contact Us</ListItemText>
          </ListItem>
        </IconButton>
        <IconButton>
          <ListItem>
            <ListItemIcon>
              <Info />
            </ListItemIcon>
            <ListItemText>About Us</ListItemText>
          </ListItem>
        </IconButton>
        <IconButton>
          <ListItem>
            <ListItemIcon>
              <FavoriteRounded />
            </ListItemIcon>
            <ListItemText>Favorits</ListItemText>
          </ListItem>
        </IconButton>
      </List>
      <List
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <IconButton>
          <ListItem>
            <ListItemIcon>
              <Facebook />
            </ListItemIcon>
          </ListItem>
        </IconButton>
        <IconButton>
          <ListItem>
            <ListItemIcon>
              <Instagram />
            </ListItemIcon>
          </ListItem>
        </IconButton>
        <IconButton>
          <ListItem>
            <ListItemIcon>
              <LinkedIn />
            </ListItemIcon>
          </ListItem>
        </IconButton>
      </List>
      <Box
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      >
        <Typography variant="h6" color="initial">
          &copy; 2023 T-Shop, All rights reserved
        </Typography>
      </Box>
      {/* </BottomNavigation> */}
    </Box>
  );
};

export default Footer;
