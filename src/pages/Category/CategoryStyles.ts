import { Box, Drawer, Paper, Typography, styled } from '@mui/material';

export const CategoyPageContainer = styled(Box)`
  display: flex;
  overflow-y: hidden;
  @media (max-width: 1039px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const CategoryPageDrawer = styled(Drawer)`
  display: flex;
  margin-top: 64px;
  width: 240px;
  flex-shrink: 0;

  & .MuiDrawer-paper {
    width: 300px;
    overflow-y: auto;
    box-sizing: border-box;
    margin-top: 100px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding-bottom: 100px;
  }
  @media (max-width: 1039px) {
    display: none;
  }
`;

export const MobileTabletFilterMenu = styled(Paper)`
  display: none;
  @media (max-width: 1039px) {
    display: flex;
    width: 90%;
    padding: 10px;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    gap: 10px;
  }
`;

export const KayWordSearchInputConatiner = styled(Paper)`
  width: 200px;
  padding: 10px;
`;

export const PriceRangeContainer = styled(Paper)`
  width: 200px;
  padding: 10px;
`;

export const CategoryListContainer = styled(Paper)`
  width: 200px;
  padding: 10px;
`;
export const BrandsListContainer = styled(Paper)`
  width: 200px;
  padding: 10px;
`;

export const FIlteredProductsContainer = styled(Box)`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  margin-left: 120px;
  @media (max-width: 1039px) {
    margin-left: 0px;
  }
`;

export const SelectidFilteriDetails = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px;
  gap: 30px;
  @media (max-width: 900px) {
    padding: 10px;
  }
`;

export const DetailsTypography = styled(Typography)`
  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    width: 100px;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    width: 80px;
  }
`;

export const FilteredproductsGridContainer = styled(Paper)`
  width: 95%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 10px;
  padding: 10px;
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 430px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const LoaderContainer = styled(Box)`
  disply: grid;
  place-items: center;
  grid-template-columns: 1fr 1fr;
`;
