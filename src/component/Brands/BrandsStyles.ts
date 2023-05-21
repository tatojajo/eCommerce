import { Box, IconButton, Paper, styled } from "@mui/material";

export const BrandsContainer = styled(Box)`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const BrandsOwerFlow = styled(Box)`
margin-top:30px;
  position: relative;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CarousellArrowsLeft = styled(IconButton)`
  position: absolute;
  left: 5rem;
`;
export const CarousellArrowsRight = styled(IconButton)`
  position: absolute;
  right: 5rem;
`;

export const ImagesContainer = styled(Box)`
  max-width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow-x: hidden;
`;
export const BrandPaper = styled(Paper)`
  border-radius: 5px;
  padding: 10px;
  margin-right: 30px;
  max-width: 200px;
  cursor: pointer;
`;

export const BrandImage = styled("img")`
  width: 200px;
  height: 80px;
  object-fit: contain;
`;
