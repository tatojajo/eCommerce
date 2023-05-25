import { useEffect } from "react";
<<<<<<< HEAD
=======

>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import {
  saveProductsData,
  saveProductsTotalAmount,
  nextPage,
  changePageNumber,
<<<<<<< HEAD
} from "../../pages/Home/redux/HomeActions/HomeActions";
=======
} from "../../redux/HomeActions/HomeActions";

import ProductCard from "../ProductCard";

>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
import {
  getAllProducts,
  productsNextpage,
} from "../../Helpers/Services/products";
import { useTranslation } from "react-i18next";

import ProductCard from "../ProductCard";

import Slider from "../Slider/Slider";
<<<<<<< HEAD
import {
  HotOffers,
  HotOffersContainer,
  MainContainer,
  ProductContainer,
} from "./ProductsContainer.Style";
import { Box, Pagination, Stack, Typography } from "@mui/material";
import {
  Search,
  SearchOffSharp,
  SearchTwoTone,
  Whatshot,
} from "@mui/icons-material";

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
=======
import { Box, Pagination, Stack } from "@mui/material";

const ProductsContainer = () => {
  const dispatch = useDispatch();
  const { products, totalProducts, searchedResults, pageNumber, totalSearchedProducts } =
    useAppSelector<HomeState>((state) => state);
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b

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
<<<<<<< HEAD
          console.log("hello");
=======
          console.log('hello')
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
          const { data } = await productsNextpage(startIndex);
          dispatch(nextPage(data.products));
        } else {
          const { data } = await getAllProducts();
          dispatch(saveProductsData(data.products));
          dispatch(saveProductsTotalAmount(data.total_found));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [startIndex]);
<<<<<<< HEAD

=======
// console.log(pageNumber, startIndex)
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
  return (
    <MainContainer>
      <Box>
        <Slider />
<<<<<<< HEAD
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
=======

        <ProductContainer>
          {(searchedResults.length === 0 ? products : searchedResults).map(
            (product: ProductItem) => {
              return <ProductCard key={product.id} product={product} />;
            }
          )}
        </ProductContainer>
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b

        <Box>
          <Stack spacing={2} mt={4}>
            <Pagination
<<<<<<< HEAD
              count={Math.ceil(
                (totalSearchedProducts
                  ? totalSearchedProducts
                  : totalProducts) / 12
              )}
=======
              count={Math.ceil((totalSearchedProducts ? totalSearchedProducts : totalProducts) / 12)}
>>>>>>> d69ccb6885efc973fdebca7708c6dbc83dc84c2b
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
