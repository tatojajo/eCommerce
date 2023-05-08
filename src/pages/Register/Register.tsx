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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  First Name
                </Typography>
                <TextField fullWidth id="" label="First Name" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  Last Name
                </Typography>
                <TextField fullWidth id="" label="Last Name" />
              </Grid>

              <Grid item xs={12}>
                <Typography mb={2} variant="body2" color="initial">
                  E-mail
                </Typography>
                <TextField fullWidth id="" label="E-mail" />
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                  City
                </Typography>
                <TextField fullWidth id="" label="City" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                  Postal Code
                </Typography>

                <TextField fullWidth id="" label="Postal Code" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                  Address
                </Typography>
                <TextField fullWidth id="" label="Adress" />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  Password
                </Typography>
                <TextField fullWidth id="" label="Password" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  Confirm Password
                </Typography>
                <TextField fullWidth id="" label="Confirm Password" />
              </Grid>
              <Grid item xs={12} mt={3}>
                <Button fullWidth variant='outlined' color='secondary'>Submit</Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
