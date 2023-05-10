import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Paper, Typography, TextField, Grid, Button } from "@mui/material";

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required"),
  city: yup.string().required("City is required"),
  postCode: yup.number().required("Postal Code is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  mobile: yup
    .string()
    .phone("Invalid Mobile Number")
    .required("mobile reuired"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(5, "Password length should be at least 6 characters")
    .max(12, "Password length cannot exceed more than 12 characters"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .min(5, "Password length should be at least 6 characters")
    .max(12, "Password length cannot exceed more than 12 characters")
    .oneOf([yup.ref("password")], "Pasword do not match"),
});

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterInitialValue>({
    resolver: yupResolver(registerValidationSchema),
  });

  const onSubmit: SubmitHandler<RegisterInitialValue> = (data) => {
    return console.log(data);
  };

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
          padding: "20px",
          bgcolor: "white",
          width: "700px",
          height: "650px",
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  First Name
                </Typography>
                <TextField
                  fullWidth
                  id="firstName"
                  label="First Name"
                  {...register("firstName")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.firstName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  Last Name
                </Typography>
                <TextField
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  {...register("lastName")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.lastName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography mb={2} variant="body2" color="initial">
                  Mobile
                </Typography>
                <TextField
                  fullWidth
                  id="mobile"
                  label="Mobile"
                  {...register("mobile")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.mobile?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography mb={2} variant="body2" color="initial">
                  E-mail
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  label="E-mail"
                  {...register("email")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.email?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                  City
                </Typography>
                <TextField
                  fullWidth
                  id="city"
                  label="City"
                  {...register("city")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.city?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                  Postal Code
                </Typography>

                <TextField
                  fullWidth
                  id="postalCode"
                  label="Postal Code"
                  {...register("postCode")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.postCode?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                  Address
                </Typography>
                <TextField
                  fullWidth
                  id="address"
                  label="Address"
                  {...register("address")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.address?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  Password
                </Typography>
                <TextField
                  fullWidth
                  id="password"
                  label="Password"
                  {...register("password")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  {...register("confirmPassword")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.confirmPassword?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={3}>
                <Button
                  type="submit"
                  fullWidth
                  variant="outlined"
                  color="secondary"
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
