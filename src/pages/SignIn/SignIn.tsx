import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { Box, Typography, TextField, Button, IconButton } from '@mui/material';
import { LoginDialoglBox, MobileSignInClose, RegisterLink, SignInContainer, TextFieldContainer } from './SignInSyled';

import {  Clear } from '@mui/icons-material';

import { userlogin } from '../../Helpers/Services/user';
import Register from '../Register';
import { isAuthenticated } from '../../Helpers/Auth/isAuthenticated';

interface SignInProps {
  isSignInOpen: boolean;
  setIsSignInOpen: Function;
}

const signInValidationSchema = yup.object().shape({
  email: yup.string().required('Username Required'),
  password: yup
    .string()
    .required('Password Is Required')
    .min(4, 'Password length should be at least 6 characters')
    .max(12, 'Password length cannot exceed more than 12 characters')
});

const SignIn: FC<SignInProps> = ({ isSignInOpen, setIsSignInOpen }) => {
  const navigate = useNavigate();
  const { isAdmin } = isAuthenticated();
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<SignInInitialValue>({
    resolver: yupResolver(signInValidationSchema)
  });
  const onSubmit: SubmitHandler<SignInInitialValue> = async (user) => {
    try {
      const { data } = await userlogin(user);
      console.log(data);
      localStorage.setItem('AccessToken', data.AccessToken);
      localStorage.setItem('User', JSON.stringify(data.User));
      if (user.email === 'admin' && user.password === 'admin') navigate('/admin-page');
      setIsSignInOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    navigate('/');
    setIsSignInOpen(false);
  };

  return isRegister ? (
    <Register isRegister={isRegister} setIsRegister={setIsRegister} />
  ) : (
    <div>
      <LoginDialoglBox
        open={isSignInOpen}
        onClose={handleClose}
        PaperProps={{
          style: { borderRadius: '20px', zIndex: 0 }
        }}>
        <SignInContainer>
          <Box
            sx={{
              zIndex: 1
            }}>
            <Typography variant="h4" color="initial">
              {t('global.login')}
            </Typography>
          </Box>
          <TextFieldContainer>
            <TextField
              variant="filled"
              autoFocus
              id="userName"
              label={t('global.username')}
              {...register('email')}
              InputProps={{
                sx: {
                  '& .MuiInputBase-input': {
                    backgroundColor: 'white',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                  }
                }
              }}
            />
            <TextField
              variant="filled"
              type="password"
              id="password"
              label={t('global.password')}
              {...register('password')}
              InputProps={{
                sx: {
                  '& .MuiInputBase-input': {
                    backgroundColor: 'white',
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px'
                  }
                }
              }}
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                color="success"
                onClick={handleSubmit(onSubmit)}>
                {t('global.login')}
              </Button>
            </Box>
          </TextFieldContainer>
          <RegisterLink>
            <Typography variant="h6" color="initial">
              {t("global.don't_have_an_account")}?
              <Button
                variant="text"
                color='primary'
                onClick={() => {
                  setIsRegister((prev) => !prev);
                  setIsSignInOpen(false);
                }}>
                {t('global.register').toUpperCase()}
              </Button>
            </Typography>
          </RegisterLink>
          <MobileSignInClose onClick={()=> setIsSignInOpen(false)}> <Clear color='error'/> </MobileSignInClose>
        </SignInContainer>
        
      </LoginDialoglBox>
    </div>
  );
};

export default SignIn;
