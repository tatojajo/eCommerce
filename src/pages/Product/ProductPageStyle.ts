type ImageProps = {
  index: number;
  productImage: number;
};
import { Button, DialogContentText, Paper, Typography } from '@mui/material';
import { styled, Box, Container } from '@mui/system';

export const ProductConatiner = styled(Paper)`
  width: 90%;
  padding: 10px;
  margin: 25px auto;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  @media (max-width: 1000px) {
    text-align: center;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ProductInfoWrapper = styled(Box)`
  width: 100%;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: lightgrey;
  border-radius: 10px;
  @media (max-width: 1000px) {
    height: auto;
    flex-direction: column;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ProductImagesContainer = styled(Box)`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  @media (max-width: 1000px) {
    align-items: start;
    flex-direction: column-reverse;
    margin-bottom: 20px;
  }
  @media (max-width: 600px) {
  }
`;

export const SliderImageWraper = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-conten: space-between;
  @media (max-width: 1000px) {
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin: 10px;
  }
  @media (max-width: 600px) {
  }
`;

export const Image = styled('img')<ImageProps>(({ index, productImage }) => ({
  border: index === productImage ? '2px solid black' : 'none',
  borderRadius: '10px',
  padding: '10px',
  width: '50px',
  height: '40px',
  '@media (max-width: 1000px)': {
    zIndex: 1
  }
}));

export const MainImageWrapper = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ProductImage = styled('img')`
  border-radius: 10px;
  padding: 10px;
  width: 350px;
  height: 300px;
  @media (max-width: 1200px) {
    width: 300px;
    height: 250px;
  }
  @media (max-width: 1000px) {
    width: 100%;
    height: 300px;
    object-fit: contain;
    margin-top: 20px;
  }
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const ProductDescription = styled(Box)`
  width: 80%;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  gap: 10px;
  @media (max-width: 1200px) {
    height: 600px;
  }
  @media (max-width: 1000px) {
    align-items: center;
    margin-top: -110px;
    text-align: center;
    z-index: 0;
  }
`;

export const ProductTitle = styled(Typography)`
  font-size: 24px;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
  @media (max-width: 900px) {
    max-width: 700px;
    font-size: 16px;
  }

  @media (max-width: 600px) {
    max-width: 400px;
    font-size: 16px;
  }
`;

export const ProductBrand = styled(Typography)`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 24px;
  @media (max-width: 1200px) {
    font-size: 18px;
  }
  @media (max-width: 900px) {
    text-align: center;
    font-size: 16px;
  }

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const ProductBtns = styled(Box)`
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 600px) {
    width: 100%;
  }
  @media (max-width: 400px) {
    width: 100%;
    flex-wrap: wrap-reverse;
  }
`;

export const QuantityContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 400px) {
    width: 100%;
    justify-content: center;
  }
`;

export const MoreInfo = styled(Button)`
  border: 1px solid;
  max-width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 15px;
  cursor: pointer;
`;

export const SimilarProductsButtons = styled(Box)`
  width: 150px;
  display: flex;
  alignitems: center;
  justify-content: space-between;
`;

export const SimilarProductsContainer = styled(Box)`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  @media (max-width: 900px) {
    border-top: 1px solid;
    padding-top: 20px;
  }
`;

export const SimilarProductsHeader = styled(Box)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
