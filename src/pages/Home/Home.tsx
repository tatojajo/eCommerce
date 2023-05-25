import React from "react";

import ProductsContainer from "../../component/ProductsContainer";
import Brands from "../../component/Brands";
import { Box } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection:'column',
      }}
    >
      <ProductsContainer />
      <Brands />
    </Box>
  );
};

export default Home;
