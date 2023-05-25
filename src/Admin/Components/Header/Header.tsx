import { Home } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Typography,
  TextField,
} from "@mui/material";

const Header = () => {
  return (
    <AppBar>
      <Container maxWidth="xl">
        <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
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
            <TextField id="" label="" />
          </Box>
          <Box>
            <Avatar/>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
