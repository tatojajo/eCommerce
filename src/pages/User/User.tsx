<<<<<<< HEAD
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Details from "./Details";

import { LocalMall, PersonOutline, Place } from "@mui/icons-material";
import {
  Box,
=======
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { LocalMall, PersonOutline, Place } from "@mui/icons-material";
import {
  Box,
  Divider,
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
<<<<<<< HEAD
} from "@mui/material";
=======
  Typography,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { useState } from "react";
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
import {
  UserInfoDetails,
  UserInfoPaper,
  UserPageContainer,
  UserPageTitle,
} from "./UserPageStyle";
<<<<<<< HEAD
import Address from "./Address";

const User = () => {
  const [selectedInfo, setSelectedInfo] = useState("My Details");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSelectedInfo = (info: string) => {
    setSelectedInfo(info);
    navigate(`?selected=${encodeURIComponent(info)}`, { replace: true });
=======
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";

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

const User = () => {
  const [disabled, setDisabled] = useState(true);
  const [selectedInfo, setSelectedInfo] = useState("My Details");
  const { t } = useTranslation();
  const user: User = JSON.parse(localStorage.getItem("User") as string);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<User>({
    resolver: yupResolver(registerValidationSchema),
  });
  // console.log(errors)
  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
    // try {
    //   const { data } = await registerUser(user);
    //   console.log(data)
    // } catch (error) {
    //   console.log(error)
    // }
  };

  const handleEditMode = () => {
    setDisabled((prev) => !prev);
  };

  const handleSelectedInfo = (info: string) => {
    setSelectedInfo(info);
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  };
  return (
    <UserPageContainer>
      <UserPageTitle variant="h4" color="initial">
        {t("global.my_acount")}
      </UserPageTitle>
      <UserInfoDetails>
        <Box sx={{ width: "20%" }}>
          <List sx={{ maxWidth: 360, bgcolor: "background.paper" }}>
            <ListItem
              sx={{ cursor: "pointer" }}
<<<<<<< HEAD
              onClick={() => {
                handleSelectedInfo("My Details");
              }}
=======
              onClick={() => handleSelectedInfo("My Detales")}
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
            >
              <ListItemAvatar>
                <PersonOutline />
              </ListItemAvatar>
              <ListItemText primary={t("global.my_details")} />
            </ListItem>
            <ListItem
              sx={{ cursor: "pointer" }}
<<<<<<< HEAD
              onClick={() => {
                handleSelectedInfo("My Address");
              }}
=======
              onClick={() => handleSelectedInfo("My Address")}
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
            >
              <ListItemAvatar>
                <Place />
              </ListItemAvatar>
              <ListItemText primary={t("global.my_address")} />
            </ListItem>
            <ListItem
              sx={{ cursor: "pointer" }}
<<<<<<< HEAD
              onClick={() => {
                handleSelectedInfo("My Orders");
              }}
=======
              onClick={() => handleSelectedInfo("My Orders")}
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
            >
              <ListItemAvatar>
                <LocalMall />
              </ListItemAvatar>
              <ListItemText primary={t("global.my_orders")} />
            </ListItem>
          </List>
        </Box>
        <UserInfoPaper elevation={5}>
<<<<<<< HEAD
          {(() => {
            if (selectedInfo === "My Details") {
              return <Details />;
            } else if(selectedInfo === "My Address") {
              return <Address />;
            }
          })()}
=======
          <Box>
            <Typography variant="h4" color="initial">
              {selectedInfo}
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
                <Typography
                  variant="subtitle2"
                  color="initial"
                  maxWidth="200px"
                >
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </Typography>
              </Grid>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowGap={2}>
                  <Grid item xs={6}>
                    <Typography variant="body1" color="initial">
                      {t("global.firstName")}
                    </Typography>
                    <TextField
                      disabled={disabled}
                      value={user.firstName}
                      {...register("firstName")}
                    />
                  </Grid>

                  <Grid item xs={6}>
                    <Typography variant="body1" color="initial">
                      {t("global.lastName")}
                    </Typography>
                    <TextField
                      fullWidth
                      disabled={disabled}
                      value={user.lastName}
                      {...register("lastName")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="initial">
                      {t("global.phone")}
                    </Typography>
                    <TextField
                      fullWidth
                      disabled={disabled}
                      value={user.phoneNumber}
                      {...register("phoneNumber")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" color="initial">
                      {t("global.email")}
                    </Typography>
                    <TextField
                      fullWidth
                      disabled={disabled}
                      value={user.email}
                      {...register("email")}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="outlined"
                      fullWidth
                      onClick={() => {
                        if (disabled) handleEditMode();
                        if (!disabled) handleEditMode();
                        
                      }}
                    >
                      {disabled ? t("global.edit") : t("global.save")}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Box>
          </Box>
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
        </UserInfoPaper>
      </UserInfoDetails>
    </UserPageContainer>
  );
};

export default User;
