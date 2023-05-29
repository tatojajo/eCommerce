import { useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Button,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { editPersonalInfo } from "../../../Helpers/Services/user";

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required("Firstname is required"),
  lastName: yup.string().required("Lastname is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  phoneNumber: yup
    .string()
    .phone("Invalid Mobile Number")
    .required("mobile reuired"),
  id: yup.string(),
});

const Details = () => {
  const [isUserEditingInfo, setIsUserEditingInfo] = useState(false);
  const navigate = useNavigate();

  const { t } = useTranslation();
  const user: User = JSON.parse(localStorage.getItem("User") as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(registerValidationSchema),
  });
  const onSubmit: SubmitHandler<User> = async (userPersonalInfo) => {
    setIsUserEditingInfo(false);
    navigate("/user/?editing-done");
    try {
      const { data } = await editPersonalInfo(userPersonalInfo);

      if ("userAddress" in user) {
        const updateUserFullInfo = JSON.stringify({
          ...data,
          userAddress: user.userAddress,
        });
        localStorage.setItem("User", updateUserFullInfo);
      } else {
        const updatedUserInfo = JSON.stringify(data);
        localStorage.setItem("User", updatedUserInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box>
        <Typography variant="h4" color="initial">
          {t("global.my_details")}
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
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "20px",
          }}
        >
          <Grid container>
            <Typography variant="subtitle2" color="initial" maxWidth="200px">
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged.
            </Typography>
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowGap={2}>
              <Grid item xs={6}>
                <Typography variant="body1" color="initial">
                  {t("global.firstName")}
                </Typography>
                {!isUserEditingInfo && (
                  <Typography variant="h3" color="initial">
                    {user.firstName}
                  </Typography>
                )}
                {isUserEditingInfo && (
                  <TextField
                    defaultValue={user.firstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" color="error">
                          <Typography variant="subtitle2" color="error">
                            {errors.firstName?.message}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    {...register("firstName")}
                  />
                )}
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1" color="initial">
                  {t("global.lastName")}
                </Typography>
                {!isUserEditingInfo && (
                  <Typography variant="h3" color="initial">
                    {user.lastName}
                  </Typography>
                )}
                {isUserEditingInfo && (
                  <TextField
                    fullWidth
                    defaultValue={user.lastName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" color="error">
                          <Typography variant="subtitle2" color="error">
                            {errors.lastName?.message}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    {...register("lastName")}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="initial">
                  {t("global.phone")}
                </Typography>
                {!isUserEditingInfo && (
                  <Typography variant="h3" color="initial">
                    {user.phoneNumber}
                  </Typography>
                )}
                {isUserEditingInfo && (
                  <TextField
                    fullWidth
                    defaultValue={user.phoneNumber}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" color="error">
                          <Typography variant="subtitle2" color="error">
                            {errors.phoneNumber?.message}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    {...register("phoneNumber")}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1" color="initial">
                  {t("global.email")}
                </Typography>
                {!isUserEditingInfo && (
                  <Typography variant="h3" color="initial">
                    {user.email}
                  </Typography>
                )}
                {isUserEditingInfo && (
                  <TextField
                    fullWidth
                    defaultValue={user.email}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" color="error">
                          <Typography variant="subtitle2" color="error">
                            {errors.email?.message}
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    {...register("email")}
                  />
                )}
              </Grid>
              <Grid item xs={12}>
                {!isUserEditingInfo && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => {
                      navigate("/user/?editing");
                      setIsUserEditingInfo(true);
                    }}
                  >
                    {t("global.edit")}
                  </Button>
                )}
                {isUserEditingInfo && (
                  <Button type="submit" variant="outlined" fullWidth>
                    {t("global.save")}
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Details;
