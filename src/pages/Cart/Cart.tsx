import { useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

import {
  decreaseQuantity,
  increaseQuantity,
  removeCartItem,
} from "../../redux/CartActions/CartActions";
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
import {
  Add,
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  Clear,
  Remove,
} from "@mui/icons-material";
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
import { moveToProductPage } from "../../redux/HomeActions/HomeActions";

const Cart = () => {
  const { t } = useTranslation();
  const cartItems: CartProductItem[] = useAppSelector(
    (state) => state.cartItems
  );
  const dispatch = useAppDispatch();

  const totalAmount = useMemo(
    () =>
      cartItems.reduce(
        (acc, corrent) => acc + Number(corrent.price) * corrent.quantity,
        0
      ),
    [cartItems]
  );
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
                  <TableCell align="left">{t("global.product")}</TableCell>
                  <TableCell align="left">{t("global.price")}</TableCell>
                  <TableCell align="left">{t("global.quantity")}</TableCell>
                  <TableCell align="left">{t("global.total")}</TableCell>
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
                        <IconButton
                          color="error"
                          onClick={() => dispatch(removeCartItem(item))}
                        >
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
                    <TableCell align="left">
                      ${Number(item.price).toFixed(2)}
                    </TableCell>
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
              {t("global.summary")}
            </Typography>
            {/* <Box mb='20px'>
              <TextField id="" label="Coupon Code" />
              <Button variant="outlined" color="secondary">
                Add
              </Button>
            </Box> */}
            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t("global.total")}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${Number(totalAmount).toFixed(2)}
              </Typography>
            </AmountInfo>
            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t("global.shipping")}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${5}
              </Typography>
            </AmountInfo>
            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t("global.subtotal")}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${totalAmount.toFixed(3)}
              </Typography>
            </AmountInfo>
            <CheckoutBtn >
              <Button variant="outlined" color="success">
                {t("global.checkout")}
              </Button>
            </CheckoutBtn>
          </Paper>
        </SummaryContainer>
      </CartItemsContainer>
    </Box>
  );
};

export default Cart;
