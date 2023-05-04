import React from "react";
import useBoolean from "../../Helpers/CustomHooks/useBoolean/useBoolean";
import { Box, Modal, Typography, TextField, Button } from "@mui/material";
import { boolean } from "yup";
import { Link } from "react-router-dom";
import { ModalBox, SignInContainer, TextFieldContainer } from "./SignInSyled";

interface SignInProps {
  open: boolean;
}

const SignIn = ({ open }: SignInProps) => {
  const handleTextFieldClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const tagName = (event.target as HTMLElement).tagName;
    if (tagName !== 'BUTTON' && tagName !== 'A') {
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
            <TextField autoFocus id="email" label="Email" />
            <TextField type="password" id="password" label="Password" />
          <Box>
            <Button variant='contained' color='success'>
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
