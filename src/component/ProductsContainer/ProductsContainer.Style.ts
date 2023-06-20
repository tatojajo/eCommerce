import { styled, Box } from '@mui/material';

export const MainContainer = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ff5f5;
  min-width: 100%;
`;

export const ProductContainer = styled(Box)`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: auto;
  gap: 10px;
  padding: 0px 20px;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 500px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ProductCard = styled(Box)`
  display: block;
  border-radius: 5px;
  background-color: #fff;
  border: solid 1px #f5f5f5;
  position: relative;
`;

export const HotOffersContainer = styled(Box)`
  margin-top: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    padding: 40px;
  }
`;

export const HotOffers = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 20px;
`;

export const HomePageContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const PaginationContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;
