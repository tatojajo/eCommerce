import React from 'react';
import * as yup from 'yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { toast } from 'react-toastify';
import { Box, Paper, Grid, TextField, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ConatctFromContainer, ContactPaper } from './contactStyles';
import { Send } from '@mui/icons-material';

const registerValidationSchema = yup.object().shape({
  firstName: yup.string().required('Firstname is required'),
  lastName: yup.string().required('Lastname is required'),
  email: yup.string().email('Invalid Email').required('Email is required'),
  phoneNumber: yup.string().phone('Invalid Mobile Number').required('mobile reuired'),
  message: yup.string().required('How Can Us Help You')
});
const Contact = () => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactForm>({
    resolver: yupResolver(registerValidationSchema)
  });

  const onSubmit: SubmitHandler<ContactForm> = async (contactInfo) => {
    console.log(contactInfo)
    toast(t('global.message successfully sent, we will contact you soon'));
    reset();
  };
  return (
    <ConatctFromContainer>
        <Typography variant='h1Montserrat' color="initial">{t('global.contact us')}</Typography>
      <ContactPaper elevation={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                variant="standard"
                fullWidth
                label={t('global.firstName')}
                helperText={errors!.firstName?.message}
                FormHelperTextProps={{
                  style: { color: 'red' }
                }}
                {...register('firstName')}
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                helperText={errors!.lastName?.message}
                variant="standard"
                fullWidth
                label={t('global.lastName')}
                FormHelperTextProps={{
                    style: { color: 'red' }
                  }}
                {...register('lastName')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                helperText={errors!.email?.message}
                variant="standard"
                fullWidth
                label={t('global.email')}
                FormHelperTextProps={{
                    style: { color: 'red' }
                  }}
                {...register('email')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                helperText={errors!.phoneNumber?.message}
                variant="standard"
                fullWidth
                label={t('global.phone')}
                FormHelperTextProps={{
                    style: { color: 'red' }
                  }}
                {...register('phoneNumber')}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                helperText={errors!.message?.message}
                multiline
                rows={4}
                variant="standard"
                fullWidth
                label={t('global.message')}
                FormHelperTextProps={{
                    style: { color: 'red' }
                  }}
                {...register('message')}
              />
            </Grid>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
            <Grid container justifyContent={'end'} mt={3}>
              <Button
                sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                type="submit"
                variant="contained"
                color="secondary">
                {t('global.send')}
                <Send color="info" />
              </Button>
            </Grid>
          </Grid>
        </form>
      </ContactPaper>
    </ConatctFromContainer>
  );
};

export default Contact;
