import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

import {
  addProductCart,
  moveToProductPage,
} from "../Home/redux/HomeActions/HomeActions";

import { Box, Typography, Button, IconButton, Paper } from "@mui/material";
import {
  ArrowDropDown,
  ArrowDropUp,
  Circle,
  ContentPaste,
  ContentPasteSearch,
  Description,
  LabelImportant,
  ShoppingBag,
  ShoppingCart,
} from "@mui/icons-material";
import {
  ProductInfoWrapper,
  ProductImagesWraper,
  ProductImagesContainer,
  SliderImageWraper,
  Image,
  ProductDescription,
  ProductBtns,
} from "./ProductPageStyle";

const Product = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [productImage, setProductImage] = useState<number>(0);
  const [color, setColor] = useState<string>("#d32f2f");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const { selectedProduct } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

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
    <Box
      sx={{
        width: "90%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
            <Box>
              <img
                src={selectedProduct?.images[productImage]}
                alt=""
                style={{
                  backgroundColor: `${color}`,
                  borderRadius: "10px",
                  padding: "10px",
                  width: "300px",
                  height: "250px",
                }}
              />
            </Box>
          </ProductImagesContainer>
        </ProductImagesWraper>
        <ProductDescription>
          <Typography
            variant="h6"
            color="initial"
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
          >
            <LabelImportant />
            {t("global.brand")}: <strong>{selectedProduct?.brand}</strong>
          </Typography>
          <Typography variant="h6" color="initial">
            {selectedProduct?.title}
          </Typography>
          <Typography variant="h6" color="initial">
            {t("global.category")}: {selectedProduct?.categories}
          </Typography>
          <Box>
            <strong>{t("global.colors")}:</strong>

            <IconButton onClick={() => setColor("#d32f2f")}>
              <Circle color="error" />
            </IconButton>
            <IconButton onClick={() => setColor("#0288d1")}>
              <Circle color="info" />
            </IconButton>
            <IconButton onClick={() => setColor("#ed6c02")}>
              <Circle color="warning" />
            </IconButton>
          </Box>
          <Typography variant="h6" color="initial">
            <strong>{t("global.price")}: </strong>$
            {Number(selectedProduct?.price).toFixed(2)}
          </Typography>
          <ProductBtns>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(addProductCart(selectedProduct!))}
            >
              {t("global.add")} <ShoppingCart />
            </Button>
            <Button variant="contained" color="secondary">
              {t("global.buy_now")}
              <ShoppingBag />
            </Button>
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Typography variant="h5" color="initial">
                <strong>Qty: </strong>
                <span style={{ color: "red", fontWeight: 700 }}>
                  {selectedProduct!.quantity}
                </span>
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <IconButton onClick={increaseQuntity}>
                  <ArrowDropUp />
                </IconButton>
                <IconButton onClick={decreaseQuantity}>
                  <ArrowDropDown />
                </IconButton>
              </Box>
            </Box>
          </ProductBtns>
          <Box
            sx={{
              border: "1px solid",
              maxWidth: "220px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "5px",
              borderRadius: "15px",
              backgroundColor: "lightgrey",
              cursor: "pointer",
            }}
            onClick={() => setIsDescriptionOpen((prev) => !prev)}
          >
            <Typography variant="h1" color="initial">
              <Description color="info" /> {t("global.more_info")}
              <IconButton>
                {isDescriptionOpen ? <ArrowDropUp /> : <ArrowDropDown />}
              </IconButton>
            </Typography>
          </Box>
        </ProductDescription>
      </ProductInfoWrapper>
      <Box>
        {isDescriptionOpen && (
          <Paper sx={{ padding: "10px" }}>{selectedProduct?.description}</Paper>
        )}
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Typography variant="h1" color="initial">
            <ContentPasteSearch color="success" />{" "}
            {t("global.similar_products")}
          </Typography>
          <Box>
            <Carousel
              autoPlay={false}
              indicators={false}
              className="home__carousel"
              navButtonsAlwaysVisible={true}
              navButtonsAlwaysInvisible={false}
            >
              {/* {sliderImages.map((item, i) => (
                <img
                  key={i}
                  src={item}
                  alt={`Tshop ${i}`}
                  className="home__image"
                />
              ))} */}
            </Carousel>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
