import { styled, Box, Modal, Dialog, IconButton } from '@mui/material';
import SignInImg from '../../images/sign_in.jpg';

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
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${SignInImg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  transform: translate(-50%; -50%);
  width: 400px;
  height: 850px;
  border: 2px solid #000;
  border-radius: 20px;
  padding: 30px;
  @media (max-width: 900px) {
    width: 350px;
  }
  @media (max-width: 80px) {
    width: 280pxpx;
  }
  @media (max-width: 600px) {
    width: 280px;
    height: 500px;
  }
  @media (max-width: 400px) {
    width: 240px;
    height: 500px;
  }
  
`;

export const TextFieldContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

export const RegisterLink = styled(Box)`
  @media (max-width: 600px) {
    position: absolute;
    bottom: -1px;
  }
`;

export const MobileSignInClose = styled(IconButton)`
  display: none;
  @media (max-width: 600px) {
    display: block;
    position: absolute;
    top: 5px;
    left: 5px;
  }
`;
