import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useLocation } from 'react-router-dom';

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Typography,
  Grid,
  IconButton
} from '@mui/material';
import ProductCard from '../../component/ProductCard';
import { Clear } from '@mui/icons-material';

type FavProps = {
  isFavOpen: boolean;
  setIsFavOpen: Function;
};

const Favorites: FC<FavProps> = ({ isFavOpen, setIsFavOpen }) => {
  const { t } = useTranslation();
  const { favorites } = useAppSelector<HomeState>((state) => state.homeReducer);
  const handleClose = () => {
    setIsFavOpen((prev: boolean) => !prev);
  };

  return (
    <Box>
      <Dialog open={isFavOpen} onClose={handleClose} scroll={'paper'} fullWidth>
        <DialogTitle>{t('global.favorites')}</DialogTitle>
        <DialogContent dividers={true}>
          {favorites.length === 0 ? (
            <Typography variant="h2Montserrat" color="initial">
              {t("global.you don't have a favorite products")}
            </Typography>
          ) : (
            <Grid container spacing={2}>
              {favorites.map((favProduct) => {
                return (
                  <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                    <ProductCard key={favProduct.id} product={favProduct} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
        <IconButton onClick={handleClose} sx={{ position: 'absolute', top: 0, right: 0 }}>
          <Clear />
        </IconButton>
      </Dialog>
    </Box>
  );
};

export default Favorites;
