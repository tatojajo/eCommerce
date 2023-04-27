import React, { useEffect, useState } from "react";
import { Pagination, Stack } from "@mui/material";
import { useProducts } from "../../Redux/ProductStore/ProductStroreContext";
import { productsNextpage } from "../../Helpers/Services/products";
import { nextPage } from "../../Redux/ProductStore/productsAction";
import { MainContainer, ProductContainer } from "./ProductsContainer.Style";
import ProductCard from "../ProductCard";

const ProductsContainer = () => {
  const { ProductDdispatch, ProductsState } = useProducts();
  const [pageNumber, setPageNumber] = useState(1);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  const startIndex = (pageNumber - 1) * ProductsState.products.length;

  useEffect(() => {
    const getNextpageproducts = async () => {
      const { data } = await productsNextpage(startIndex);
      ProductDdispatch(nextPage(data.products, data.total_found));
    };
    getNextpageproducts();
  }, [pageNumber]);
  return (
    <MainContainer>
      <ProductContainer>
        {ProductsState.products.map((product) => {
          return (
            <ProductCard product = {product}/>
            // <ProductCard
            //   style={{
            //     width: "100px",
            //     height: "200px",
            //     padding: "10px",
            //   }}
            // >
            //   <img src={product.images[0]} alt="" width={200} height={100} />
            //   <p>Brand: {product.brand}</p>
            //   <p>price: ${product.price}</p>
            // </ProductCard>
          );
        })}
      </ProductContainer>
        
      <div>
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(ProductsState.total_products / 20)}
            page={pageNumber}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      </div>
    </MainContainer>
  );
};

export default ProductsContainer;
