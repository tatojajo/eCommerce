import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { HomeState } from "../../@types/general";
import { Box, Typography, Container } from "@mui/material";

const Product = () => {
  const [productImage, setProductImage] = useState(0);
  const { selectedProduct } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );
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
          height:'500px',
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px",
          marginTop: "60px",
        }}
      >
        <Box sx={{ width: "50%", height:'300px' }}>
          <img src={selectedProduct?.images[productImage]} alt="" />
        </Box>
        <Box sx={{ width: "50%", height:'300px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
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
        <Container maxWidth="xl" sx={{ display: "flex", gap: "10px" }}>
          {selectedProduct?.images.map((image, index) => {
            return (
              <Box
                onClick={() => setProductImage(index)}
                sx={{
                  border: "2px solid black",
                  borderRadius: "10px",
                  padding: "10px",
                }}
              >
                <img src={image} width="100px" height="100px" alt="image" />
              </Box>
            );
          })}
        </Container>
      </Box>
    </Box>
  );
};

export default Product;
