import { useMemo, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const addressSchema = yup.object().shape({
  city: yup.string().required("City is required"),
  postCode: yup.number().required("Postal Code is required"),
  address: yup.string().required("Address is required"),
});

const Address = () => {
  const [disabled, setDisabled] = useState(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserAddress>({
    resolver: yupResolver(addressSchema),
  });
  const userData = localStorage.getItem("User");
  const user = JSON.parse(userData as string);
  const onSubmit: SubmitHandler<UserAddress> = async (userAddress) => {
    const userFullData = { ...user, userAddress };
    localStorage.removeItem("User");
    localStorage.setItem("User", JSON.stringify(userFullData));
    setDisabled(true);
    reset();
  };

  const handleDeleteUserAddress = () => {
    const userData = { ...user };
    delete userData.userAddress;
    localStorage.removeItem("User");
    localStorage.setItem("User", JSON.stringify(userData));
    setDisabled(false);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h4" color="initial">
          {t("global.my_address")}
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography variant="subtitle1" color="initial">
            {t("global.personal_information")}
          </Typography>
          <Divider />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Grid container>
            {user.userAddress ? (
              <Box>
                <Paper
                  elevation={6}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    backgroundColor: "rgb(56 189 248)",
                    padding: "10px",
                  }}
                >
                  <Box>
                    <Typography variant="h5" color="initial">
                      <strong>{t("global.city")}</strong>:
                      {user.userAddress.city}
                    </Typography>
                    <Typography variant="h5" color="initial">
                      <strong>{t("global.address")}</strong>:
                      {user.userAddress.address}
                    </Typography>
                    <Typography variant="h5" color="initial">
                      <strong>{t("global.postal_code")}</strong>:
                      {user.userAddress.postCode}
                    </Typography>
                  </Box>
                  <Box textAlign="center">
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={handleDeleteUserAddress}
                    >
                      Delete
                    </Button>
                  </Box>
                </Paper>
              </Box>
            ) : (
              <Typography variant="h4" color="initial" maxWidth="200px">
                No Address Registered
              </Typography>
            )}
          </Grid>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              width: "80%",
            }}
          >
            <Grid item xs={12} sm={4}>
              <Typography mb={1} variant="body2" color="initial">
                {t("global.city")}
              </Typography>
              <TextField
                disabled={disabled}
                fullWidth
                id="city"
                {...register("city")}
              />
              <Typography variant="subtitle2" color="error">
                {errors.city?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography mb={2} variant="body2" color="initial">
                {t("global.postal_code")}
              </Typography>

              <TextField
                disabled={disabled}
                fullWidth
                id="postalCode"
                {...register("postCode")}
              />
              <Typography variant="subtitle2" color="error">
                {errors.postCode?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Typography mb={2} variant="body2" color="initial">
                {t("global.address")}
              </Typography>
              <TextField
                disabled={disabled}
                fullWidth
                id="address"
                {...register("address")}
              />
              <Typography variant="subtitle2" color="error">
                {errors.address?.message}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={4} mt="20px">
              <Button fullWidth type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Address;
