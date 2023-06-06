import { useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useTranslation } from "react-i18next";

import {
  addProductCart,
  moveToProductPage,
  saveSimilarProducts,
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
import { selectedBrandProducts } from "../../Helpers/Services/products";
import { BrandImage, BrandPaper } from "../../component/Brands/BrandsStyles";
import Slider from "react-slick";
import ProductCard from "../../component/ProductCard";

// const settings = {
//   dots: false,
//   infinite: false,
//   speed: 5000,
//   slidesToShow: 7,
//   slidesToScroll: 1,
//   autoplay: true,
//   autoplaySpeed: 3000,
//   slickNext: false,
//   slickPrevious: false,
//   swipe: true,
//   arrows: false,
// };

const Product = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [productImage, setProductImage] = useState<number>(0);
  const [color, setColor] = useState<string>("#d32f2f");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const { selectedProduct, similarProducts } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );
  console.log(selectedProduct);
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

  useEffect(() => {
    try {
      const similarProducts = async () => {
        const { data } = await selectedBrandProducts(selectedProduct!.brand);
        dispatch(saveSimilarProducts(data.products));
      };
      similarProducts();
    } catch (error) {
      console.log(error);
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [selectedProduct?.id]);

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
          <Paper elevation={4} sx={{ p: 3 }}>
            <Typography variant="h1" color="initial">
              {t("global.details")}:
            </Typography>
            <Paper elevation={3} sx={{ padding: "10px", marginTop: "10px" }}>
              {selectedProduct?.description}
            </Paper>
          </Paper>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: `${isDescriptionOpen}` && "50px",
        }}
      >
        <Box>
          <Typography variant="h1" color="initial">
            <ContentPasteSearch color="success" />{" "}
            {t("global.similar_products")}
          </Typography>
          <Box
            sx={{
              margin: "50px 0px",
              display: "flex",
              justifyContent: "center",
              gap: "20px",
            }}
          >
            {/* <Slider {...settings}> */}
            {similarProducts.map((product, index) => {
              return <ProductCard key={index} product={product} />;
            })}
            {/* </Slider> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Product;
