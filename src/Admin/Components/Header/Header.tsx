import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { isAuthenticated } from "../../../Helpers/Auth/isAuthenticated";
import { useTranslation } from "react-i18next";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  MenuItem,
  Divider,
  ListItemIcon,
  Menu,
} from "@mui/material";
import { Home, Logout, Settings } from "@mui/icons-material";

const Header = () => {
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user: User = JSON.parse(localStorage.getItem("User") as string);

  const handleAdminMenu = () => {
    setIsAdminMenuOpen(true);
  };
  const handleCloseAdminMenu = () => {
    setIsAdminMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("AccessToken");
    localStorage.removeItem("User");
  };
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <Home />
            </IconButton>
            <Typography variant="h4" color="white">
              T-Shop
            </Typography>
          </Box>
         
          <Box>
            <Box display="flex" alignItems="center">
              <Button
                ref={anchorRef}
                id="user-menu-button"
                aria-controls={isAdminMenuOpen ? "user menu" : undefined}
                aria-expanded={isAdminMenuOpen ? "true" : undefined}
                aria-haspopup="true"
                onClick={() => {
                  if (isAuthenticated().isAdmin) handleAdminMenu();
                }}
              >
                <Avatar>{user?.firstName[0]}</Avatar>

                <Typography ml={1} variant="body2">
                  {user?.firstName}
                </Typography>
              </Button>
              {isAuthenticated().isAdmin && (
                <Menu
                  anchorEl={anchorRef.current}
                  id="account-menu"
                  open={isAdminMenuOpen}
                  onClose={handleCloseAdminMenu}
                  onClick={handleCloseAdminMenu}
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
                      isAuthenticated().isAdmin && navigate("/user");
                      setIsAdminMenuOpen(false);
                    }}
                  >
                    <Avatar /> My account
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleCloseAdminMenu}>
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
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
