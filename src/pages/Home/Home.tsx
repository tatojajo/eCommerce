import React from "react";

import ProductsContainer from "../../component/ProductsContainer";
<<<<<<< HEAD
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
=======
import { Box } from "@mui/material";
import { WidthFull } from "@mui/icons-material";


const Home = () => {
  return (
    <Box sx={{
      display:'flex',
      width:'100%'
    }}>
    

      <ProductsContainer />
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
    </Box>
  );
};

export default Home;
