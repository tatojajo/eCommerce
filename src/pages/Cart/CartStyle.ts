import { styled, Box } from "@mui/material";
import { Link } from "react-router-dom";

export const CartTitle = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 30px 0px 30px 0px;
`;

export const CartItemsContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CartItems = styled(Box)`
  width: 80%;
`;

export const CartItemName = styled(Box)`
  display: flex;
  gap: 10px;
`;

export const ItemQUantity = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SummaryContainer = styled(Box)`
  width: 20%;
  position: fixed;
  top: 85px;
  right: 0;
  height: 600px;
`;

export const AmountInfo = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid;
  padding: 5px;
`;

export const CheckoutBtn = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

export const ProductLink = styled(Link)`
    max-width: 350px;
    text-decoration: none;
    color: black;
}`;
