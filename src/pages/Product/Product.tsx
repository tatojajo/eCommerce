import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
// import Carousel from "react-material-ui-carousel";
import Carousel from "react-gallery-carousel";
import "react-gallery-carousel/dist/index.css";
import { HomeState } from "../../@types/general";
import { Box, Typography, Container, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const Product = () => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "500px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px",
          marginTop: "60px",
        }}
      >
        <Box sx={{ width: "50%", height: "300px" }}>
          <img src={selectedProduct?.images[productImage]} alt="" />
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "300px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" color="initial">
            Brand: {selectedProduct?.brand}
          </Typography>
          <Typography variant="h5" color="initial">
            Model: {selectedProduct?.title}
          </Typography>
          <Typography variant="h6" color="initial">
            Category: {selectedProduct?.category}
          </Typography>
          <Typography variant="h6" color="initial">
            Price: ${selectedProduct?.price}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Container
          maxWidth="xl"
          sx={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <IconButton
            aria-label=""
            onClick={prevImage}
            sx={{ height: "40px", width: "40px" }}
          >
            <ArrowBack />
          </IconButton>
          <Box
            sx={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
              overflowX: "scroll",
              scrollBehavior: "smooth",
            }}
          >
            {selectedProduct?.images.map((image, index) => {
              return (
                <img
                  src={image}
                  key={index}
                  onClick={() => setProductImage(index)}
                  alt="image"
                  style={{
                    border: index === productImage ? "2px solid black" : "none",
                    borderRadius: "10px",
                    padding: "10px",
                    width: "100px",
                    height: "100px",
                  }}
                />
              );
            })}
          </Box>
          <IconButton
            aria-label=""
            onClick={nextImage}
            sx={{ height: "40px", width: "40px" }}
          >
            <ArrowForward />
          </IconButton>
        </Container>
      </Box>
    </Box>
  );
};

export default Product;
