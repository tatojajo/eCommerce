import React from 'react';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid';
import ProductCard from '../../../component/ProductCard';

const ReservedProducts = () => {
  const myReservedProducts = localStorage.getItem('Reserved_Products');
  const parsedReservedProducts = myReservedProducts ? JSON.parse(myReservedProducts) : [];

  return (
    <Grid container spacing={2} width="100%">
      {parsedReservedProducts &&
        parsedReservedProducts.map((product: ProductItem) => {
          return (
            <Grid key={product.id} item sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ReservedProducts;
