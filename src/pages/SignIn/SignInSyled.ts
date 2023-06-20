import { styled, Box, Modal, Dialog } from "@mui/material";
import SignInImg from "../../images/sign_in.jpg";

export const LoginDialoglBox = styled(Dialog)`
  display: flex;
  align-items: top;
  justify-content: flex-end;
  border-radius: 3;
`;

export const SignInContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)),
    url(${SignInImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: translate(-50%; -50%);
  width: 400px;
  height: 850px;
  border: 2px solid #000;
  border-radius: 20px;
  padding: 30px;
`;

export const TextFieldContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;
