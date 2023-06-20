import { styled, Box, IconButton, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

export const CartTitle = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 130px 0px 30px 0px;
`;

export const CartItemsContainer = styled(Box)`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const CartItems = styled(Paper)`
  width: 80%;
  @media (max-width: 860px) {
   display:flex;
  }
`;

export const CartItemName = styled(Box)`
  position: relative;
  @media (max-width: 1200px) {
    max-width:500px;
    font-size:12px;
  }

  @media (max-width: 900px) {
    max-width:400px;
    font-size:12px;
  }

 

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export const ProductRemoveButton = styled(IconButton)`
  position: absolute;
  top: -10px;
  left:-30px;
`;

export const ItemQUantity = styled(Box)`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const SummaryContainer = styled(Box)`
  width: 18%;
  position: fixed;
  top: 100px;
  right: 10px;
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
    text-decoration: none;
    color: black;
}`;
