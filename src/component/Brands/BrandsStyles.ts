import { Paper, Box, styled } from "@mui/material";

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
`;

export const BrandImage = styled("img")`
  width: 200px;
  height: 80px;
  object-fit: contain;
`;
