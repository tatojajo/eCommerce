import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { Box,  Typography, TextField, Button, DialogActions } from "@mui/material";
import { LoginDialoglBox, SignInContainer, TextFieldContainer } from "./SignInSyled";
import { userlogin } from "../../Helpers/Services/userLogin";
import { isAuthenticated } from "../../Helpers/Auth/isAuthenticated";
import User from "../User";

interface SignInProps {
  open: boolean;
  setOpen: Function
}

const signInValidationSchema = yup.object().shape({
  email: yup.string().required("Username Required"),
  password: yup
  .string()
    .required("Password Is Required")
    .min(4, "Password length should be at least 6 characters")
    .max(12, "Password length cannot exceed more than 12 characters"),
  });
  
  const SignIn = ({ open, setOpen }: SignInProps) => {

    const navigate = useNavigate()
    const {t} = useTranslation()
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInInitialValue>({ resolver: yupResolver(signInValidationSchema) });
  const onSubmit: SubmitHandler<SignInInitialValue> = async (user) =>{
   try {
    const {data} = await userlogin(user)
    localStorage.setItem('AccessToken', data.AccessToken)
    console.log()
    localStorage.setItem('User',  JSON.stringify(data.User))
    if(data.AccessToken) setOpen(false)
   } catch (error) {
    console.log(error)
   }
  }

const handleClose = ()=>{
  navigate('/')
  setOpen(false)
}

  return (
    <div>
      <LoginDialoglBox
        open={open}
        onClose={handleClose}
      >
        <SignInContainer>
          <Box
            sx={{
              marginTop: "50px",
            }}
          >
            <Typography variant="h4" color="initial">
              {t('global.login')}
            </Typography>
          </Box>
          <TextFieldContainer>
            <TextField
              autoFocus
              id="userName"
              label={t('global.username')}
              {...register("email")}
            />
            <TextField
              type="password"
              id="password"
              label={t('global.password')}
              {...register("password")}
            />
            <Box>
              <Button
              type="submit"
                variant="contained"
                color="success"
                onClick={handleSubmit(onSubmit)}
              >
                {t('global.login')}
              </Button>
            </Box>
          </TextFieldContainer>
          <Box>
            <Typography variant="subtitle1" color="initial">
              {t("global.don't_have_an_account")}?
              <Link to="/register">{t('global.register')}</Link>
            </Typography>
          </Box>
        </SignInContainer>
      </LoginDialoglBox>
    </div>
  );
};

export default SignIn;
