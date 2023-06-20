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
import {
  AddShoppingCart,
  ArrowLeft,
  ArrowRight,
  Height,
  Star,
  StarBorder
} from '@mui/icons-material';
import { CardBts, CardContainer, ProductLink } from './ProductCardStyle';
import palette from '../../theme/palette';

const ProductCard = ({ product }: ProductCartProps) => {
  const [productImage, setProductImage] = useState(0);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
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
  return (
    <Paper
      elevation={10}
      sx={{
        position: 'relative',
        height: '100%'
      }}>
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

          <Typography color="error" sx={{ marginTop: '10px' }}>
            {t('global.price')}: ${Number(product.price).toFixed(2)}
          </Typography>
        </CardContent>
        <CardBts>
          <Button
            variant="contained"
            color="primary"
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
            variant="outlined"
            color="secondary"
            onClick={() => {
              handleFavProduct(product);
            }}>
            {isProductInFavorites ? <Star /> : <StarBorder />}
          </Button>
        </CardBts>
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
            <Typography variant="h4Montserrat" color="initial">
              {t('global.reserved')}
            </Typography>
          ) : (
            <Typography
              onClick={() => toast(() => t('global.product_has_successfully_reserved'))}
              variant="h4Montserrat"
              color="initial">
              {t('global.reserve')}
            </Typography>
          )}
        </Box>
      </CardContainer>
    </Paper>
  );
};

export default ProductCard;
