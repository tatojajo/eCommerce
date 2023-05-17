import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import {
  saveProductsData,
  saveProductsTotalAmount,
  saveSliderImages,
  nextPage,
} from "../../redux/HomeActions/HomeActions";

import ProductCard from "../ProductCard";

import {
  getAllProducts,
  productsNextpage,
} from "../../Helpers/Services/products";
import { MainContainer, ProductContainer } from "./ProductsContainer.Style";
import { HomeState, ProductItem } from "../../@types/general";
import { useAppSelector } from "../../redux/hooks";
import Slider from "../Slider/Slider";
import {
  Pagination,
  Stack,
} from "@mui/material";

const ProductsContainer = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const dispatch = useDispatch();
  const { products, totalProducts, searchedResults, totalSearchedProducts } =
    useAppSelector<HomeState>((state) => state);

  const startIndex = (pageNumber - 1) * 12;

  // searchedResults &&
  //   useEffect(() => {
  //     const getSearchedNextpageProducts = async () => {
  //       const { data } = await getSearchedProductsNextPage(
  //         debouncedValue,
  //         startIndex
  //       );
  //       dispatch(searchedProductsNextPage(data.products));
  //     };
  //     getSearchedNextpageProducts();
  //   }, [pageNumber]);

  // useEffect(() => {
  //   if (debouncedValue.length < 2) {
  //     dispatch(saveSearchedProducts([], 0));
  //     setPageNumber(1);
  //   }
  //   if (debouncedValue.length > 2) {
  //     setPageNumber(1);
  //     const searchedproducts = async () => {
  //       const { data } = await getSearchedProducts(debouncedValue);
  //       console.log(data.products);
  //       dispatch(saveSearchedProducts(data.products, data.total_found));
  //     };
  //     searchedproducts();
  //   }
  // }, [debouncedValue]);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPageNumber(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pageNumber > 1) {
          const { data: nextPageData } = await productsNextpage(startIndex);
          dispatch(nextPage(nextPageData.products));
        } else {
          const { data } = await getAllProducts();
          dispatch(saveProductsData(data.products));
          dispatch(saveProductsTotalAmount(data.total_found));
          dispatch(saveSliderImages(data.products));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        
      }
    };

    fetchData();
  }, [pageNumber]);

  return (
    <MainContainer>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "20px",
        }}
      ></div>
      <Slider />

      <ProductContainer>
        {(searchedResults.length === 0 ? products : searchedResults).map(
          (product: ProductItem) => {
            return <ProductCard key={product.id} product={product} />;
          }
        )}
      </ProductContainer>

      <div>
        <Stack spacing={2} mt={4}>
          <Pagination
            count={Math.ceil(totalProducts / 12)}
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
