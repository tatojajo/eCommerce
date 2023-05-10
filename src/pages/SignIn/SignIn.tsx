import React from "react";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { ModalBox, SignInContainer, TextFieldContainer } from "./SignInSyled";
import { adminLogin } from "../../Helpers/Services/adminLogin";

interface SignInProps {
  open: boolean;
}

const signInValidationSchema = yup.object().shape({
  userName: yup.string().required("Username Required"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(4, "Password length should be at least 6 characters")
    .max(12, "Password length cannot exceed more than 12 characters"),
});

const SignIn = ({ open }: SignInProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInInitialValue>({ resolver: yupResolver(signInValidationSchema) });
  const onSubmit: SubmitHandler<SignInInitialValue> = (data) =>{
   adminLogin()
  }
  const handleTextFieldClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const tagName = (event.target as HTMLElement).tagName;
    if (tagName !== "BUTTON" && tagName !== "A") {
      event.stopPropagation();
    }
  };

  return (
    <div>
      <ModalBox
        open={open}
        // onClose={handleClose}
      >
        <SignInContainer onClick={(e) => handleTextFieldClick(e)}>
          <Box
            sx={{
              marginTop: "50px",
            }}
          >
            <Typography variant="h4" color="initial">
              SignIn
            </Typography>
          </Box>
          <TextFieldContainer>
            <TextField
              autoFocus
              id="userName"
              label="UserName"
              {...register("userName")}
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              {...register("password")}
            />
            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit(onSubmit)}
              >
                Sign In
              </Button>
            </Box>
          </TextFieldContainer>
          <Box>
            <Typography variant="subtitle1" color="initial">
              Don't have an account?
              <Link to="/register">Register here</Link>
            </Typography>
          </Box>
        </SignInContainer>
      </ModalBox>
    </div>
  );
};

export default SignIn;
