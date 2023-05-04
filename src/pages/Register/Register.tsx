import { Box, Paper, Typography, TextField, Grid, Button } from "@mui/material";
import React from "react";

const Register = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "lightslategrey",
        with: "100%",
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "30px",
          bgcolor: "white",
          width: "700px",
          height: "600px",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" color="initial">
            Create T-shop Account
          </Typography>
        </Box>

        <Box>
          <form>
            <Grid container gap={4}>
              <Grid container columns={12}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="initial">First Name</Typography>
                  <TextField id="" label="First Name" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body2' color="initial">Last Name</Typography>
                  <TextField id="" label="Last Name" />
                </Grid>
              </Grid>
              <Grid container columns={12}>
                <Grid item xs={12}>

                <Typography variant="body2" color="initial">E-mail</Typography>
                <TextField
                  id=""
                  label="E-mail"
                />
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={4}>
                <Typography variant="body2" color="initial">City</Typography>
                  <TextField id="" label="City" />
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="body2" color="initial">Poatal Code</Typography>
                  
                  <TextField id="" label="Postal Code" />
                </Grid>
                <Grid item xs={4}>
                <Typography variant="body2" color="initial">Address</Typography>
                  <TextField id="" label="Adress" />
                </Grid>
              </Grid>
              <Grid container xs={12}>
                <Grid item xs={6}> 
                <Typography variant="body2" color="initial">Password</Typography>
                  <TextField id="" label="Password" />
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="initial">Confirm Password</Typography>
                  <TextField id="" label="Confirm Password" />
                </Grid>
              </Grid>
            </Grid>
            <Box>
              <Button >Submit</Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
