import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import {
  addProductCart,
  moveToProductPage,
  removeFavoriteProduct,
  favoriteProduct,
} from "../../pages/Home/redux/HomeActions/HomeActions";

import {
  Button,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  AddShoppingCart,
  ArrowLeft,
  ArrowRight,
  ShoppingCart,
  Star,
  StarBorder,
} from "@mui/icons-material";
import { CardContainer, ProductLink } from "./ProductCardStyle";

const ProductCard = ({ product }: ProductCartProps) => {
  // console.log(product)
  const { favorites } = useAppSelector((state) => state.homeReducer);
  const [isFavorite, setIsFavorite] = useState(false);
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [productImage, setProductImage] = useState(0);

  const handleFavProduct = (product: ProductItem) => {
    const isProductInFavorites = favorites.find(
      (item: ProductItem) => item.id === product.id
    );

    if (isProductInFavorites) {
      dispatch(removeFavoriteProduct(product));
    } else {
      dispatch(favoriteProduct(product));
      setIsFavorite(true);
    }
  };

  const handelFavIcon = () => {
    setIsFavorite((prev) => !prev);
  };
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
            to={`/product/${product.id}/${product.brand}`}
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
            <AddShoppingCart />
          </Button>

          <Button
            sx={{ backgroundColor: "yellow" }}
            onClick={() => {
              handelFavIcon();
              handleFavProduct(product);
            }}
          >
            {isFavorite ? <Star /> : <StarBorder />}
          </Button>
        </CardActions>
      </CardContainer>
    </Paper>
  );
};

export default ProductCard;
