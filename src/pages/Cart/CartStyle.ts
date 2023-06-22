import { styled, Box, IconButton, Paper, Typography } from '@mui/material';
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
  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const CartItems = styled(Paper)`
  width: 80%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  row-gap: 5px;
  @media (max-width: 950px) {
    width: 70%;
  }
  @media (max-width: 700px) {
    width: 90%;
  }
`;

export const ProductCard = styled(Paper)`
  padding: 0px 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductImageTitleContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 500px;
`;

export const ProductImage = styled('img')`
  width: 100px;
  height: 100px;
  @media (max-width: 530px) {
    width: 80px;
    height: 80px;
  }
`;
export const ProductLink = styled(Link)`
    text-decoration: none;
    color: black;
    font-size: 12px;
    @media (max-width: 1200px) {  
      max-width:300px
  }
    @media (max-width: 860px) {  
      max-width:220px
  }
  @media (max-width: 530px) {
    font-size:8px
  }
  
}`;

export const ProductQuntityContainer = styled(Box)`
  display: flex;
  align-items: center;
`;

export const ProductTotalPrice = styled(Typography)`
  display: flex;
  @media (max-width: 530px) {
    font-size: 10px;
  }
`;
export const ProductRemoveButton = styled(IconButton)`
  position: absolute;
  top: -10px;
  left: -10px;
`;

export const ItemQUantity = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SummaryContainer = styled(Box)`
  width: 18%;
  position: fixed;
  top: 100px;
  right: 0px;
  height: 600px;
  @media (max-width: 950px) {
    width: 28%;
  }
  @media (max-width: 700px) {
    display: none;
  }
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

export const MobileCheckoutSummary = styled(Paper)`
  display: none;
  @media (max-width: 700px) {
    width: 90%;
    display: flex;
    padding: 10px;
    flex-direction: column;
    margin-top:20px
  }
  @media (max-width: 700px) {
  }
`;

export const PriceInfo = styled(Box)`

    display: flex;
    padding: 10px;
    flex-direction: column;
    gap:10px
  
`;

export const PriceDetailsFlex = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid;
`;
