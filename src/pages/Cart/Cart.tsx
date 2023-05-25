<<<<<<< HEAD
import { useMemo, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
=======
import { useMemo } from "react";
import { useAppSelector,useAppDispatch } from "../../redux/hooks";
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
import { useTranslation } from "react-i18next";

import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
<<<<<<< HEAD
} from "../Home/redux/CartActions/CartActions";
=======
} from "../../redux/CartActions/CartActions";
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Paper,
  Button,
} from "@mui/material";
<<<<<<< HEAD
import { ArrowDropDown, ArrowDropUp, Clear } from "@mui/icons-material";
=======
import {
  Add,
  Clear,
  Remove,
} from "@mui/icons-material";
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
import {
  AmountInfo,
  CartItemName,
  CartItems,
  CartItemsContainer,
  CartTitle,
  CheckoutBtn,
  ItemQUantity,
  ProductLink,
  SummaryContainer,
} from "./CartStyle";
import { moveToProductPage } from "../Home/redux/HomeActions/HomeActions";
import { isAuthenticated } from "../../Helpers/Auth/isAuthenticated";

const Cart = () => {
<<<<<<< HEAD
  const { t } = useTranslation();
  const{ cartItems} = useAppSelector(
    (state) => state.homeReducer
  );
=======
  const {t} = useTranslation()
  const cartItems = useAppSelector((state) => state.cartItems);
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  const dispatch = useAppDispatch();

  

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (acc, corrent) => acc + Number(corrent.price) * corrent.quantity,
        0
      ),
    [cartItems]
  );

  const handleCheckout = async () => {
    if (isAuthenticated().isUser && cartItems.length > 0) {
      await fetch("http://localhost:4000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
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
    <Box>
      <CartTitle>
        <Typography fontWeight={900} variant="h1" color="initial">
          {t("global.my_cart")}
        </Typography>
        {cartItems.length === 0 && (
          <Typography fontWeight={700} mt={3} color="error">
            {`${t("global.cart")} ${t("global.is")} ${t("global.empty")}!`}
          </Typography>
        )}
      </CartTitle>
      <CartItemsContainer>
        <CartItems>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
<<<<<<< HEAD
                  <TableCell align="left">{t("global.product")}</TableCell>
                  <TableCell align="left">{t("global.price")}</TableCell>
                  <TableCell align="left">{t("global.quantity")}</TableCell>
                  <TableCell align="left">{t("global.total")}</TableCell>
=======
                  <TableCell align="left">{t('global.product')}</TableCell>
                  <TableCell align="left">{t('global.price')}</TableCell>
                  <TableCell align="left">{t('global.quantity')}</TableCell>
                  <TableCell align="left">{t('global.total')}</TableCell>
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item: CartProductItem) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      <CartItemName>
<<<<<<< HEAD
                        <IconButton
                          color="error"
                          onClick={() => dispatch(removeCartItem(item))}
                        >
=======
                        <IconButton color="error" onClick={()=>dispatch(removeCartItem(item))}>
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
                          <Clear />
                        </IconButton>
                        <img
                          src={item.images[0]}
                          width="50px"
                          height="50px"
                          alt={item.brand}
                        />
                        <ProductLink
                          to={`/product/${item.id}/${item.title}`}
                          onClick={() => dispatch(moveToProductPage(item))}
                        >
                          {item.title}
                        </ProductLink>
                      </CartItemName>
                    </TableCell>
<<<<<<< HEAD
                    <TableCell align="left">
                      ${Number(item.price).toFixed(2)}
                    </TableCell>
=======
                    <TableCell align="left">${Number(item.price).toFixed(2)}</TableCell>
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
                    <TableCell align="left">
                      <ItemQUantity>
                        <IconButton
                          onClick={() => dispatch(decreaseQuantity(item))}
                        >
                          <ArrowDropDown />
                        </IconButton>
                        <Typography variant="subtitle2" color="initial">
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => dispatch(increaseQuantity(item))}
                        >
                          <ArrowDropUp />
                        </IconButton>
                      </ItemQUantity>
                    </TableCell>
                    <TableCell align="left">
                      ${(item.quantity * item.price).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CartItems>
        <SummaryContainer>
          <Paper sx={{ padding: "20px" }}>
            <Typography
              textAlign="center"
              mb="20px"
              variant="h5"
              color="initial"
            >
<<<<<<< HEAD
              {t("global.summary")}
=======
              {t('global.summary')}
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
            </Typography>
            {/* <Box mb='20px'>
              <TextField id="" label="Coupon Code" />
              <Button variant="outlined" color="secondary">
                Add
              </Button>
            </Box> */}
            <AmountInfo>
              <Typography variant="body1" color="initial">
<<<<<<< HEAD
                {t("global.total")}:
=======
                {t('global.total')}:
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
              </Typography>
              <Typography variant="body1" color="initial">
                ${Number(totalAmount).toFixed(2)}
              </Typography>
            </AmountInfo>
            <AmountInfo>
              <Typography variant="body1" color="initial">
<<<<<<< HEAD
                {t("global.shipping")}:
=======
                {t('global.shipping')}:
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
              </Typography>
              <Typography variant="body1" color="initial">
                ${5}
              </Typography>
            </AmountInfo>
            <AmountInfo>
              <Typography variant="body1" color="initial">
<<<<<<< HEAD
                {t("global.subtotal")}:
=======
                {t('global.subtotal')}:
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
              </Typography>
              <Typography variant="body1" color="initial">
                ${totalAmount.toFixed(3)}
              </Typography>
            </AmountInfo>
            <CheckoutBtn>
<<<<<<< HEAD
              <Button
                variant="outlined"
                color="success"
                onClick={handleCheckout}
              >
                {t("global.checkout")}
=======
              <Button variant="outlined" color="success">
                {t('global.checkout')}
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
              </Button>
            </CheckoutBtn>
          </Paper>
        </SummaryContainer>
      </CartItemsContainer>
    </Box>
  );
};

export default Cart;
