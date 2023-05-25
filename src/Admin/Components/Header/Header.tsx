import { Home } from "@mui/icons-material";
import {
  AppBar,
  Container,
  Toolbar,
  IconButton,
  Box,
  Avatar,
  Typography,
  TextField, Button,
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
          <Box sx={{ width:'200px',display:'flex', alignItems:'center', justifyContent:'space-between'}}>
            <Typography width='90px' display='flex' alignItems='center' justifyContent='space-between' variant='body1' color="initial">
            <Avatar/>
              admin</Typography>
            <Button variant="contained" color="secondary">
              LogOut
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
