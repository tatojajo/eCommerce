import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import {
  saveProductsData,
  saveProductsTotalAmount,
  nextPage,
  changePageNumber,
  saveSliderImages,
} from "../../pages/Home/redux/HomeActions/HomeActions";
import {
  getAllProducts,
  productsNextpage,
} from "../../Helpers/Services/products";
import { useTranslation } from "react-i18next";

import ProductCard from "../ProductCard";

import MainSlider from "../Slider/Slider";
import {
  HotOffers,
  HotOffersContainer,
  MainContainer,
  ProductContainer,
} from "./ProductsContainer.Style";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import { Search, Whatshot } from "@mui/icons-material";

const ProductsContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    products,
    totalProducts,
    searchedResults,
    pageNumber,
    totalSearchedProducts,
  } = useAppSelector<HomeState>((state) => state.homeReducer);

  const startIndex = (pageNumber - 1) * 12;

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    dispatch(changePageNumber(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pageNumber > 1) {
          console.log("hello");
          const { data } = await productsNextpage(startIndex);
          dispatch(nextPage(data.products));
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
  }, [startIndex]);
  return (
    <MainContainer>
      <Box sx={{ width: "90%" }}>
        <MainSlider />
        <HotOffersContainer>
          <HotOffers>
            {searchedResults.length > 0 ? (
              <Search fontSize="large" color="error" />
            ) : (
              <Whatshot fontSize="large" color="error" />
            )}

            <Typography variant="h1">
              {searchedResults.length > 0
                ? t("global.search_results")
                : t("global.hot_offers")}
            </Typography>
          </HotOffers>
          <ProductContainer>
            {(searchedResults.length === 0 ? products : searchedResults).map(
              (product: ProductItem) => {
                return <ProductCard key={product.id} product={product} />;
              }
            )}
          </ProductContainer>
        </HotOffersContainer>

        <Box>
          <Stack spacing={2} mt={4}>
            <Pagination
              count={Math.ceil(
                (totalSearchedProducts
                  ? totalSearchedProducts
                  : totalProducts) / 12
              )}
              page={pageNumber}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          </Stack>
        </Box>
      </Box>
    </MainContainer>
  );
};

export default ProductsContainer;
