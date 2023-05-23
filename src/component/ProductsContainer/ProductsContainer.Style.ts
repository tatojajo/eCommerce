import { styled, Box } from "@mui/material";

export const MainContainer = styled(Box)`
  margin-top: 15px;
  display: flex;
  align-items: start;
  background: #ff5f5;
`;
export const ProductContainer = styled(Box)`
  gap: 3rem;
  width: 70%;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: space-between;
`;

export const ProductCard = styled(Box)`
  display: block;
  border-radius: 5px;
  background-color: #fff;
  border: solid 1px #f5f5f5;
  position: relative;
`;

export const HotOffersContainer = styled(Box)`
  display: flex;
  flex-direction: column;
 
`;

export const HotOffers = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  padding:20px
`;
