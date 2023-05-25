<<<<<<< HEAD
type ImageProps = {
  index: number;
  productImage: number;
};
import { styled, Box, Container } from "@mui/system";

export const ProductConatiner = styled(Box)`
  background-color: grey;
  margin: 20px auto;
=======
import { styled, Box, Container } from "@mui/system";

export const ProductConatiner = styled(Box)`
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  display: flex;
  flexdirection: column;
  alignitems: center;
  justify-content: center;
`;

export const ProductInfoWrapper = styled(Box)`
<<<<<<< HEAD
  width: 100%;
  height: 550px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const ProductImagesWraper = styled(Box)`
  width: 60rem;
  display: flex;
=======
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
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  align-items: center;
  justify-content: center;
`;

<<<<<<< HEAD
export const ProductImagesContainer = styled(Container)`
  display: flex;
  gap: 25px;
=======
export const SliderImagesContainer = styled(Container)`
  display: flex;
  gap: 10px;
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  align-items: center;
`;

export const SliderImageWraper = styled(Box)`
  display: flex;
<<<<<<< HEAD
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
=======
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
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  justify-content: space-between;
`;
