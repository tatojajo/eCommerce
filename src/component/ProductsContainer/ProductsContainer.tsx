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
import { Whatshot } from "@mui/icons-material";

const ProductsContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, totalProducts,  pageNumber } =
    useAppSelector<HomeState>((state) => state.homeReducer);

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [startIndex]);
  return (
    <MainContainer>
      <Box sx={{ width: "100%" }}>
        <MainSlider />
        <HotOffersContainer>
          <HotOffers>
            <Whatshot fontSize="large" color="error" />
            <Typography variant="h1">{t("global.hot_offers")}</Typography>
          </HotOffers>
          <ProductContainer>
            {products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </ProductContainer>
        </HotOffersContainer>

        <Box>
          <Stack spacing={2} mt={4}>
            <Pagination
              count={Math.ceil(totalProducts / 12)}
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
