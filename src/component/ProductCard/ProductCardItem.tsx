import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProductCartProps } from "../../@types/ProductCartProps";
import { useDispatch } from "react-redux";
import {
  addProductCart,
  moveToProductPage,
} from "../../redux/HomeActions/HomeActions";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  StarBorderOutlined,
} from "@mui/icons-material";
import { CardContainer } from "./ProductsCardStyle";

const ProductCard = ({ product }: ProductCartProps) => {
  // console.log(product)
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(0);
  const nextImage = () => {
    setProductImage((prev) => (prev + 1) % product.images.length);
  };
  const prevImage = () => {
    setProductImage(
      (prev) => (prev - 1 + product.images.length) % product.images.length
    );
  };


  return (
    // <CardContainer>
    //   <ImageWrapper>
    //     <IconButton
    //       sx={{
    //         position: "absolute",
    //         top: "40%",
    //         left: "-40px",
    //         cursor: "pointer",
    //       }}
    //       onClick={prevImage}
    //     >
    //       <ArrowLeft />
    //     </IconButton>
    //     <CardImage src={product.images[productImage]} alt="" />
    //     <IconButton
    //       sx={{
    //         position: "absolute",
    //         top: "40%",
    //         right: "-40px",
    //         cursor: "pointer",
    //       }}
    //       onClick={nextImage}
    //     >
    //       <ArrowRight />
    //     </IconButton>
    //   </ImageWrapper>
    //   <Box
    //     sx={{
    //       height: "130px",
    //     }}
    //   >
    //     {/* <Button onClick={()=>{
    //         navigate(`/product/${product.id}`)
    //         dispatch(moveToProductPage(product))
    //       }}>
    //         {product.title}
    //       </Button> */}
    //     <Link
    //       to={`/product/${product.id}/${product.title}`}
    //       onClick={() => dispatch(moveToProductPage(product))}
    //     >
    //       {product.title}
    //     </Link>

    //     <Typography variant="subtitle1" color="error">
    //       {t("global.price")}: ${product.price}
    //     </Typography>
    //   </Box>
    //   <Box>
    //     <Button
    //       variant="contained"
    //       onClick={() => dispatch(addProductCart(product))}
    //     >
    //       {t("global.add")}
    //       <ShoppingCart />
    //     </Button>
    //     <Button sx={{ backgroundColor: "yellow" }}>
    //       <StarBorderOutlined />
    //     </Button>
    //   </Box>
    // </CardContainer>
    <Paper elevation={8}>
      <CardContainer>
        <Box sx={{ position: "relative" }}>
          <IconButton
            sx={{
              position: "absolute",
              top: "40%",
              left: "-30px",
              cursor: "pointer",
            }}
            onClick={prevImage}
          >
            <ArrowLeft />
          </IconButton>
          <CardMedia
            sx={{ width: 280, height: 230 }}
            image={product.images[productImage]}
            title={product.title}
          />
          <IconButton
            sx={{
              position: "absolute",
              top: "40%",
              right: "-30px",
              cursor: "pointer",
            }}
            onClick={nextImage}
          >
            <ArrowRight />
          </IconButton>
        </Box>
        <CardContent>
          <Link
            to={`/product/${product.id}/${product.title}`}
            onClick={() => dispatch(moveToProductPage(product))}
          >
            {product.title}
          </Link>
          <Typography variant="subtitle1" color="orange">
            {t("global.price")}: ${product.price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            onClick={() => dispatch(addProductCart(product))}
          >
            {t("global.add")}
            <ShoppingCart />
          </Button>

          <Button sx={{ backgroundColor: "yellow" }}>
            <StarBorderOutlined />
          </Button>
        </CardActions>
      </CardContainer>
    </Paper>
  );
};

export default ProductCard;
