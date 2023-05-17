import React from "react";

import ProductsContainer from "../../component/ProductsContainer";
import { Box } from "@mui/material";
import { WidthFull } from "@mui/icons-material";


const Home = () => {
  return (
    <Box sx={{
      display:'flex',
      width:'100%'
    }}>
    

      <ProductsContainer />
    </Box>
  );
};

export default Home;
