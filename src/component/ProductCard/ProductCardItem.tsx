import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  addProductCart,
  moveToProductPage,
  removeFavoriteProduct,
  favoriteProduct,
  saveSearchedProducts,
  reservedProduct
} from '../../pages/Home/redux/HomeActions/HomeActions';

import {
  Box,
  Button,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography
} from '@mui/material';
import { AddShoppingCart, ArrowLeft, ArrowRight, Star, StarBorder } from '@mui/icons-material';
import { CardContainer, ProductLink } from './ProductCardStyle';

const ProductCard = ({ product }: ProductCartProps) => {
  const [reserveColor, setReserveColo] = useState('red');
  const [productImage, setProductImage] = useState(0);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { favorites, reservedProducts } = useAppSelector<HomeState>((state) => state.homeReducer);
  const myReservedProducts = localStorage.getItem('Reserved_Products');
  const parsedReservedProducts = myReservedProducts ? JSON.parse(myReservedProducts) : [];

  const isProductInFavorites = favorites.find((item) => item.id === product.id);
  const isProductReserved =
    parsedReservedProducts &&
    parsedReservedProducts.find((item: ProductItem) => item.id === product.id);

  const handleFavProduct = (product: ProductItem) => {
    const isProductInFavorites = favorites.find((item) => item.id === product.id);
    if (isProductInFavorites) {
      dispatch(removeFavoriteProduct(product));
      product.favorite = false;
    } else {
      dispatch(favoriteProduct(product));
      product.favorite = true;
    }
  };

  const nextImage = () => {
    setProductImage((prev) => (prev + 1) % product.images.length);
  };
  const prevImage = () => {
    setProductImage((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const reserveProduct = (product: ProductItem) => {
    const reserved = reservedProducts.find((item) => item.id === product.id);
    if (!reserved) dispatch(reservedProduct(product));
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newColor = reserveColor === 'red' ? 'orange' : 'red';
  //     setReserveColo(newColor);
  //   }, 100);

  //   return () => clearInterval(interval);
  // }, [myReservedProducts, favorites]);
  return (
    <Paper elevation={10} sx={{ position: 'relative' }}>
      <CardContainer>
        <CardMedia component="div" sx={{ height: '140px', width: '140px', position: 'relative' }}>
          <IconButton
            sx={{
              position: 'absolute',
              top: '40%',
              left: '-30px',
              cursor: 'pointer'
            }}
            onClick={prevImage}>
            <ArrowLeft />
          </IconButton>
          <img
            src={product.images?.[productImage]}
            alt={product.title}
            style={{ height: '100%', width: '100%' }}
          />
          <IconButton
            sx={{
              position: 'absolute',
              top: '40%',
              right: '-30px',
              cursor: 'pointer'
            }}
            onClick={nextImage}>
            <ArrowRight />
          </IconButton>
        </CardMedia>
        <CardContent>
          <ProductLink
            to={`/product/${product.categories}/${product.brand}`}
            onClick={() => {
              dispatch(moveToProductPage(product));
            }}>
            {product.title}
          </ProductLink>

          <Typography variant="body2" color="error" sx={{ marginTop: '10px', fontWeight: '900' }}>
            {t('global.price')}: ${Number(product.price).toFixed(2)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(addProductCart(product));
              toast(() =>
                t('global.product_added_to_cart_check_your_cart_to_complete_your_purchase')
              );
            }}>
            {t('global.add')}
            <AddShoppingCart />
          </Button>

          <Button
            sx={{ backgroundColor: 'yellow' }}
            onClick={() => {
              handleFavProduct(product);
            }}>
            {isProductInFavorites ? <Star /> : <StarBorder />}
          </Button>
        </CardActions>
        <Box
          sx={{
            position: 'absolute',
            top: -8,
            right: 5,
            bgcolor: isProductReserved ? 'green' : 'red',
            padding: '5px',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            '&:hover': {
              bgcolor: 'orange'
            }
          }}
          onClick={() => reserveProduct(product)}>
          {isProductReserved ? (
            <Typography variant="h4" color="initial">
              {t('global.reserved')}
            </Typography>
          ) : (
            <Typography variant="h4" color="initial">
              {t('global.reserve')}
            </Typography>
          )}
        </Box>
      </CardContainer>
    </Paper>
  );
};

export default ProductCard;
