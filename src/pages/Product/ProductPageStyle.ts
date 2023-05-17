import { styled, Box, Container } from "@mui/system";

export const ProductConatiner = styled(Box)`
  display: flex;
  flexdirection: column;
  alignitems: center;
  justify-content: center;
`;

export const ProductInfoWrapper = styled(Box)`
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 30px;
  margin-top: 60px;
`;

export const ProductImagesWraper = styled(Box)`
  width: 50%;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SliderImagesContainer = styled(Container)`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SliderImageWraper = styled(Box)`
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  //   overflow-x: scroll;
  //   scroll-behavior: smooth;
`;

export const Image = styled("img")(({ index, productImage }) => ({
  border: index === productImage ? "2px solid black" : "none",
  borderRadius: "10px",
  padding: "10px",
  width: "100px",
  height: "100px",
  backgroundColor: "#D8BFD8	",
}));

export const ProductDescription = styled(Box)`
  width: 50%;
  height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
