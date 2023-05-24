type ImageProps = {
  index: number;
  productImage: number;
};
import { styled, Box, Container } from "@mui/system";

export const ProductConatiner = styled(Box)`
  background-color: grey;
  margin: 20px auto;
  display: flex;
  flexdirection: column;
  alignitems: center;
  justify-content: center;
`;

export const ProductInfoWrapper = styled(Box)`
  width: 100%;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductImagesWraper = styled(Box)`
  width: 60rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductImagesContainer = styled(Container)`
  display: flex;
  gap: 25px;
  align-items: center;
`;

export const SliderImageWraper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const Image = styled("img")<ImageProps>(({ index, productImage }) => ({
  border: index === productImage ? "2px solid black" : "none",
  borderRadius: "10px",
  padding: "10px",
  width: "50px",
  height: "50px",
}));

export const ProductDescription = styled(Box)`
  width: 50rem;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: ;
  justify-content: space-between;
`;

export const ProductBtns = styled(Box)`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
