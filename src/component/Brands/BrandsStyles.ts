import { Paper, Box, styled } from '@mui/material';

export const PopularBrandsTitle = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 30px;
`;

export const BrandPaper = styled(Paper)`
  border-radius: 5px;
  padding: 10px;
  max-width: 200px;
  cursor: pointer;
  @media (max-width: 1200px) {
    max-width: 170px;
  }
  @media (max-width: 900px) {
    max-width: 100px;
  }
`;

export const BrandImage = styled('img')`
  width: 200px;
  height: 80px;
  object-fit: contain;
  @media (max-width: 1200px) {
    width: 150px;
    height: 70px;
    margin: auto;
  }
  @media (max-width: 900px) {
    width: 100px;
    height: 80px;
  }
`;
