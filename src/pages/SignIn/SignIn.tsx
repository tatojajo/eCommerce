import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Box, Typography, TextField, Button } from "@mui/material";
import {
  LoginDialoglBox,
  SignInContainer,
  TextFieldContainer,
} from "./SignInSyled";
import { userlogin } from "../../Helpers/Services/user";

import Register from "../Register";

interface SignInProps {
  open: boolean;
  setOpen: Function;
}

const signInValidationSchema = yup.object().shape({
  email: yup.string().required("Username Required"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(4, "Password length should be at least 6 characters")
    .max(12, "Password length cannot exceed more than 12 characters"),
});

const SignIn: FC<SignInProps> = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInInitialValue>({
    resolver: yupResolver(signInValidationSchema),
  });
  const onSubmit: SubmitHandler<SignInInitialValue> = async (user) => {
    console.log(user);
    try {
      const { data } = await userlogin(user);
      localStorage.setItem("AccessToken", data.AccessToken);
      localStorage.setItem("User", JSON.stringify(data.User));
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    navigate("/");
    setOpen(false);
  };

  return isRegister ? (
    <Register open={isRegister} setOpen={setIsRegister} />
  ) : (
    <div>
      <LoginDialoglBox
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: "20px" },
        }}
      >
        <SignInContainer>
          <Box
            sx={{
              marginTop: "50px",
            }}
          >
            <Typography variant="h4" color="initial">
              {t("global.login")}
            </Typography>
          </Box>
          <TextFieldContainer>
            <TextField
              autoFocus
              id="userName"
              label={t("global.username")}
              {...register("email")}
            />
            <TextField
              type="password"
              id="password"
              label={t("global.password")}
              {...register("password")}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={handleSubmit(onSubmit)}
              >
                {t("global.login")}
              </Button>
            </Box>
          </TextFieldContainer>
          <Box>
            <Typography variant="h6" color="initial">
              {t("global.don't_have_an_account")}?
              <Button
                variant="text"
                onClick={() => {
                  setIsRegister((prev) => !prev);
                  setOpen(false);
                }}
              >
                {t("global.register")}
              </Button>
            </Typography>
          </Box>
        </SignInContainer>
      </LoginDialoglBox>
    </div>
  );
};

export default SignIn;
