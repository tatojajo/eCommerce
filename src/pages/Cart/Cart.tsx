import { useMemo } from "react";
import { useAppSelector,useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

import {
  decreaseQuantity,
  increaseQuantity,
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
  SummaryContainer,
} from "./CartStyle";

const Cart = () => {
  const {t} = useTranslation()
  const cartItems = useAppSelector((state) => state.cartItems);
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
        <Typography variant="h3" color="initial">
          My Cart
        </Typography>
      </CartTitle>
      <CartItemsContainer>
        <CartItems>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">{t('global.product')}</TableCell>
                  <TableCell align="left">{t('global.price')}</TableCell>
                  <TableCell align="left">{t('global.quantity')}</TableCell>
                  <TableCell align="left">{t('global.total')}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left" component="th" scope="row">
                      <CartItemName>
                        <IconButton color="error">
                          <Clear />
                        </IconButton>
                        <img
                          src={item.images[0]}
                          width="50px"
                          height="50px"
                          alt={item.brand}
                        />
                        <Typography
                          maxWidth="400px"
                          variant="subtitle2"
                          color="initial"
                        >
                          {item.title}
                        </Typography>
                      </CartItemName>
                    </TableCell>
                    <TableCell align="left">${item.price}</TableCell>
                    <TableCell align="left">
                      <ItemQUantity>
                        <IconButton
                          onClick={() => dispatch(decreaseQuantity(item))}
                        >
                          <Remove />
                        </IconButton>
                        <Typography variant="subtitle2" color="initial">
                          {item.quantity}
                        </Typography>
                        <IconButton
                          onClick={() => dispatch(increaseQuantity(item))}
                        >
                          <Add />
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
              {t('global.summary')}
            </Typography>
            {/* <Box mb='20px'>
              <TextField id="" label="Coupon Code" />
              <Button variant="outlined" color="secondary">
                Add
              </Button>
            </Box> */}
            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t('global.total')}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${totalAmount}
              </Typography>
            </AmountInfo>
            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t('global.shipping')}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${5}
              </Typography>
            </AmountInfo>
            <AmountInfo>
              <Typography variant="body1" color="initial">
                {t('global.subtotal')}:
              </Typography>
              <Typography variant="body1" color="initial">
                ${totalAmount.toFixed(3)}
              </Typography>
            </AmountInfo>
            <CheckoutBtn>
              <Button variant="outlined" color="success">
                {t('global.checkout')}
              </Button>
            </CheckoutBtn>
          </Paper>
        </SummaryContainer>
      </CartItemsContainer>
    </Box>
  );
};

export default Cart;
