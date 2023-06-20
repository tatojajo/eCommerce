import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import ProductCard from "../../component/ProductCard";

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
      <Dialog open={isFavOpen} onClose={handleClose} scroll={"paper"}>
        <DialogTitle>{t("global.favorites")}</DialogTitle>
        <DialogContent dividers={true} sx={{display:'flex'}}>
          {favorites.map((favProduct) => {
            return <ProductCard key={favProduct.id} product={favProduct} />;
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Favorites;
