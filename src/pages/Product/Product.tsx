import { useState } from "react";
<<<<<<< HEAD
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import "react-gallery-carousel/dist/index.css";
import {
  addProductCart,
  moveToProductPage,
} from "../Home/redux/HomeActions/HomeActions";
import { Box, Typography, Button } from "@mui/material";
import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import {
  ProductInfoWrapper,
  ProductImagesWraper,
  ProductImagesContainer,
  SliderImageWraper,
  Image,
  ProductDescription,
  ProductBtns,
=======
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
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
} from "./ProductPageStyle";

const Product = () => {
  const { t } = useTranslation();
<<<<<<< HEAD
  const dispatch = useAppDispatch();
=======
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  const [productImage, setProductImage] = useState(0);
  const { selectedProduct } = useAppSelector<HomeState>((state) => state.homeReducer);

  const increaseQuntity = () => {
    const increasedQuantity = selectedProduct && {
      ...selectedProduct,
      quantity: selectedProduct.quantity + 1,
    };
    dispatch(moveToProductPage(increasedQuantity!));
  };
  const decreaseQuantity = () => {
    if (selectedProduct?.quantity === 1) return;
    const decreasedQuantity = selectedProduct && {
      ...selectedProduct,
      quantity: selectedProduct.quantity - 1,
    };
    dispatch(moveToProductPage(decreasedQuantity!));
  };

  return (
<<<<<<< HEAD
    <Box>
      <ProductInfoWrapper>
        <ProductImagesWraper>
          <ProductImagesContainer maxWidth="sm">
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
=======
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
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
            <Box>
              <img
                src={selectedProduct?.images[productImage]}
                alt=""
<<<<<<< HEAD
                style={{
                  width: "500px",
                  height: "500px",
                }}
              />
            </Box>
          </ProductImagesContainer>
        </ProductImagesWraper>
        <ProductDescription>
          <Typography variant="h1" color="initial">
            {t("global.brand")}: {selectedProduct?.brand}
          </Typography>
          <Typography variant="h5" color="initial">
            {t("global.model")}: {selectedProduct?.title}
          </Typography>
          <Typography variant="h6" color="initial">
            {t("global.category")}: {selectedProduct?.categories}
          </Typography>
          <Typography variant="h6" color="initial">
            {t("global.price")}: ${selectedProduct?.price}
          </Typography>
          <ProductBtns>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(addProductCart(selectedProduct!))}
            >
              Add <ShoppingCart />
            </Button>
            <Button variant="contained" color="secondary">
              By Now <ShoppingBag />
            </Button>
            <Button variant="outlined" onClick={decreaseQuantity}>
              -
            </Button>
            <Typography variant="h5" color="initial">
              {selectedProduct!.quantity}
            </Typography>
            <Button variant="outlined" onClick={increaseQuntity}>
              +
            </Button>
          </ProductBtns>
        </ProductDescription>
      </ProductInfoWrapper>
    </Box>
=======
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
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  );
};

export default Product;
