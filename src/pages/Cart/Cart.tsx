import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem
} from '../Home/redux/CartActions/CartActions';
import { Box, Typography, IconButton, Paper, Button } from '@mui/material';
import { ArrowDropDown, ArrowDropUp, Clear } from '@mui/icons-material';
import {
  AmountInfo,
  CartItems,
  CartItemsContainer,
  CartTitle,
  CheckoutBtn,
  ItemQUantity,
  MobileCheckoutSummary,
  PriceDetailsFlex,
  PriceInfo,
  ProductCard,
  ProductImage,
  ProductImageTitleContainer,
  ProductLink,
  ProductQuntityContainer,
  ProductRemoveButton,
  ProductTotalPrice,
  SummaryContainer
} from './CartStyle';
import { moveToProductPage } from '../Home/redux/HomeActions/HomeActions';
import { isAuthenticated } from '../../Helpers/Auth/isAuthenticated';

const Cart = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cartItems } = useAppSelector<HomeState>((state) => state.homeReducer);
  const dispatch = useAppDispatch();

  const totalAmount = useMemo(
    () => cartItems.reduce((acc, corrent) => acc + Number(corrent.price) * corrent.quantity, 0),
    [cartItems.length]
  );

  const handleCheckout = async () => {
    if ((isAuthenticated().isAdmin || isAuthenticated().isUser) && cartItems.length > 0) {
      await fetch('http://localhost:4000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: cartItems })
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.url) {
            window.location.assign(response.url); // Forwarding user to Stripe
          }
        });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <CartTitle>
        <Typography fontWeight={900} variant="h1" color="initial">
          {t('global.my_cart')}
        </Typography>
        {cartItems.length === 0 && (
          <Box>
            <Typography fontWeight={700} mt={3} color="error">
              {`${t('global.cart')} ${t('global.is')} ${t('global.empty')}!`}
            </Typography>
            <Button variant="outlined" color="warning" onClick={() => navigate('/')}>
              {t('global.back to shop')}
            </Button>
          </Box>
        )}
      </CartTitle>
      <CartItemsContainer>
        <CartItems elevation={7}>
          {cartItems.map((cartProduct) => {
            return (
              <ProductCard key={cartProduct.id} elevation={3}>
                <ProductRemoveButton
                  color="error"
                  onClick={() => dispatch(removeCartItem(cartProduct))}>
                  <Clear />
                </ProductRemoveButton>
                <ProductImageTitleContainer>
                  <ProductImage src={cartProduct.images[0]} alt={cartProduct.title} />
                  <ProductLink
                    to={`/product/${cartProduct.categories}/${cartProduct.brand}}`}
                    onClick={() => dispatch(moveToProductPage(cartProduct))}>
                    {cartProduct.title}
                  </ProductLink>
                </ProductImageTitleContainer>
                <ProductQuntityContainer>
                  <Typography
                    variant="h4Montserrat"
                    color="initial"
                    sx={{ fontSize: { xs: '12px', md: '16px', lg: '20px' } }}>
                    QTY:
                  </Typography>
                  <ItemQUantity>
                    <IconButton onClick={() => dispatch(decreaseQuantity(cartProduct))}>
                      <ArrowDropDown sx={{ fontSize: { xs: '12px', md: '16px', lg: '20px' } }} />
                    </IconButton>
                    <Typography variant="subtitle2" color="initial">
                      {cartProduct.quantity}
                    </Typography>
                    <IconButton onClick={() => dispatch(increaseQuantity(cartProduct))}>
                      <ArrowDropUp sx={{ fontSize: { xs: '12px', md: '16px', lg: '20px' } }} />
                    </IconButton>
                  </ItemQUantity>
                </ProductQuntityContainer>
                <Box>
                  <ProductTotalPrice variant="h4Montserrat" color="initial">
                    <span style={{ color: 'red', fontSize: '17px' }}>$</span>
                    {(cartProduct.quantity * Number(cartProduct.price)).toFixed(2)}
                  </ProductTotalPrice>
                </Box>
              </ProductCard>
            );
          })}
        </CartItems>
        <SummaryContainer>
          <Paper sx={{ padding: '20px' }}>
            <Typography textAlign="center" mb="20px" variant="h5" color="initial">
              {t('global.summary')}
            </Typography>

            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t('global.total')}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${Number(totalAmount).toFixed(2)}
              </Typography>
            </AmountInfo>
            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t('global.shipping')}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${0}
              </Typography>
            </AmountInfo>

            <Box>
              <AmountInfo>
                <Typography variant="body1" color="initial">
                  {t('global.subtotal')}:
                </Typography>
                <Typography variant="body1" color="initial">
                  ${totalAmount.toFixed(3)}
                </Typography>
              </AmountInfo>
            </Box>

            <CheckoutBtn>
              <Button variant="outlined" color="success" onClick={handleCheckout}>
                {t('global.checkout')}
              </Button>
            </CheckoutBtn>
          </Paper>
        </SummaryContainer>
        <MobileCheckoutSummary>
          <Box>
            <Typography variant="h1Montserrat" color="initial">
              {t('global.summary')}
            </Typography>
          </Box>
          <PriceInfo>
            <PriceDetailsFlex>
              <Typography variant="h4Montserrat" color="initial">
                {t('global.total')}
              </Typography>
              <Typography variant="h4Montserrat" color="initial">
                ${Number(totalAmount).toFixed(2)}
              </Typography>
            </PriceDetailsFlex>
            <PriceDetailsFlex>
              <Typography variant="h4Montserrat" color="initial">
                {t('global.shipping')}
              </Typography>
              <Typography variant="h4Montserrat" color="initial">
                ${0}
              </Typography>
            </PriceDetailsFlex>
            <PriceDetailsFlex>
              <Typography variant="h2Montserrat" color="initial">
                {' '}
                {t('global.subtotal')}
              </Typography>
              <Typography variant="h2Montserrat" color="initial">
                {' '}
                ${totalAmount.toFixed(3)}
              </Typography>
            </PriceDetailsFlex>
          </PriceInfo>
          <CheckoutBtn>
            <Button variant="outlined" color="success" onClick={handleCheckout}>
              {t('global.checkout')}
            </Button>
          </CheckoutBtn>
        </MobileCheckoutSummary>
      </CartItemsContainer>
    </Box>
  );
};

export default Cart;
