import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import "yup-phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
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
  const {t} = useTranslation()
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
            {t("global.create_T-shop_Account")}
          </Typography>
        </Box>

        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.firstName')}
                </Typography>
                <TextField
                  fullWidth
                  id="firstName"
                  label={t('global.firstName')}
                  {...register("firstName")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.firstName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.lastName')}
                </Typography>
                <TextField
                  fullWidth
                  id="lastName"
                  label={t('global.lastName')}
                  {...register("lastName")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.lastName?.message}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.phone')}
                </Typography>
                <TextField
                  fullWidth
                  id="mobile"
                  label={t('global.phone')}
                  {...register("mobile")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.mobile?.message}
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.email')}
                </Typography>
                <TextField
                  fullWidth
                  id="email"
                  label={t('global.email')}
                  {...register("email")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.email?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.city')}
                </Typography>
                <TextField
                  fullWidth
                  id="city"
                  label={t('global.city')}
                  {...register("city")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.city?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.postal_code')}
                </Typography>

                <TextField
                  fullWidth
                  id="postalCode"
                  label={t('global.postal_code')}
                  {...register("postCode")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.postCode?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.address')}
                </Typography>
                <TextField
                  fullWidth
                  id="address"
                  label={t('global.address')}
                  {...register("address")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.address?.message}
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.password')}
                </Typography>
                <TextField
                  fullWidth
                  id="password"
                  label={t('global.password')}
                  {...register("password")}
                />
                <Typography variant="subtitle2" color="error">
                  {errors.password?.message}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography mb={2} variant="body2" color="initial">
                {t('global.confirm_password')}
                </Typography>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  label={t('global.confirm_password')}
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
                  {t('global.submit')}
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
