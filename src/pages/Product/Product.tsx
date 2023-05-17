import { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import "react-gallery-carousel/dist/index.css";
import { HomeState } from "../../@types/general";
import { Box, Typography, IconButton, Paper } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  ProductConatiner,
  ProductInfoWrapper,
  ProductImagesWraper,
  SliderImagesContainer,
  SliderImageWraper,
  Image,
  ProductDescription,
} from "./ProductPageStyle";

const Product = () => {
  const { t } = useTranslation();
  const [productImage, setProductImage] = useState(0);
  const { selectedProduct } = useAppSelector<HomeState>((state) => state);
  const prevImage = () => {
    setProductImage((prev) =>
      prev === 0 ? selectedProduct?.images.length! - 1 : prev - 1
    );
  };
  const nextImage = () => {
    setProductImage((prev) =>
      prev === selectedProduct?.images.length! - 1 ? 0 : prev + 1
    );
  };

  return (
    <Paper sx={{
      width:'80%',
      margin:'10px auto',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    }}>
      <ProductConatiner>
        <ProductInfoWrapper>
          <ProductImagesWraper>
            <Box>
              <img
                src={selectedProduct?.images[productImage]}
                alt=""
                style={{ backgroundColor: "#D8BFD8	" }}
              />
            </Box>

            <SliderImagesContainer maxWidth="sm">
              {/* <IconButton
              aria-label=""
              onClick={prevImage}
              sx={{ height: "40px", width: "40px" }}
            >
              <ArrowBack />
            </IconButton> */}
              <SliderImageWraper>
                {selectedProduct?.images.map((image, index) => {
                  return (
                    index < 4 && (
                      <Image
                        key={index}
                        src={image}
                        index={index}
                        productImage={productImage}
                        onClick={() => setProductImage(index)}
                        alt="image"
                      />
                    )
                  );
                })}
              </SliderImageWraper>
              {/* <IconButton
              aria-label=""
              onClick={nextImage}
              sx={{ height: "40px", width: "40px" }}
            >
              <ArrowForward />
            </IconButton> */}
            </SliderImagesContainer>
          </ProductImagesWraper>
          <ProductDescription>
            <Typography variant="h3" color="initial">
              {t("global.brand")}: {selectedProduct?.brand}
            </Typography>
            <Typography variant="h5" color="initial">
              {t("global.model")}: {selectedProduct?.title}
            </Typography>
            <Typography variant="h6" color="initial">
              {t("global.category")}: {selectedProduct?.category}
            </Typography>
            <Typography variant="h6" color="initial">
              {t("global.price")}: ${selectedProduct?.price}
            </Typography>
          </ProductDescription>
        </ProductInfoWrapper>
      </ProductConatiner>
    </Paper>
  );
};

export default Product;
