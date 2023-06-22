import { styled, Box, List, ListItem, ListItemText } from '@mui/material';

export const BrandPageContainer = styled(Box)`
  width: 100%;
  padding: 20px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BrandImageContainer = styled(Box)`
  width: 80%;
  object-fit: cover;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fceade;
  border-radius: 20px;
`;

export const BrandProductsTitle = styled(List)`
  width: 100%;
  display: flex;
  align-items: start;
  @media (max-width: 420px) {
    display:grid;
    grid-template-columns:repeat(2, 1fr);
    width:90%;
    padding:0;
  }
`;

export const CategoryTitle = styled(ListItemText)`
  @media (max-width: 430px) {
    font-size: 0px;
  }
`;

export const ProductTitle = styled(ListItem)`
  width: 120px;
  @media (max-width: 470px) {
    width: 100px;
  }
`;

export const BrandImage = styled('img')`
  width: 80%;
  height: 300px;
  object-fit: contain;
  @media (max-width: 900px) {
    width: 60%;
    height: 250px;
  }
  @media (max-width: 650px) {
    width: 40%;
    height: 190px;
  }
  @media (max-width: 480px) {
    width: 20%;
    height: 90px;
  }
`;
