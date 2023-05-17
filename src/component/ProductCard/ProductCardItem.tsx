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
  Breadcrumbs,
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
import { CardContainer, ProductLink } from "./ProductCardStyle";

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
    <Paper elevation={10}>
      <CardContainer>
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
          component="div"
          sx={{ height: "140px", width: "140px", position: "relative" }}
        >
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
          <img
            src={product.images[productImage]}
            alt={product.title}
            style={{ height: "100%", width: "100%" }}
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
        </CardMedia>
        <CardContent>
          <ProductLink
            to={`/product/${product.id}/${product.title}`}
            onClick={() => dispatch(moveToProductPage(product))}
          >
            {product.title}
          </ProductLink>

          <Typography
            variant="body2"
            color="error"
            sx={{ marginTop: "10px", fontWeight: "900" }}
          >
            {t("global.price")}: ${Number(product.price).toFixed(2)}
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
