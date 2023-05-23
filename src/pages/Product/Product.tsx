import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import "react-gallery-carousel/dist/index.css";
import {
  addProductCart,
  moveToProductPage,
} from "../../redux/HomeActions/HomeActions";
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
} from "./ProductPageStyle";

const Product = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [productImage, setProductImage] = useState(0);
  const { selectedProduct } = useAppSelector<HomeState>((state) => state);

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
            <Box>
              <img
                src={selectedProduct?.images[productImage]}
                alt=""
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
            {t("global.category")}: {selectedProduct?.category}
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
  );
};

export default Product;
