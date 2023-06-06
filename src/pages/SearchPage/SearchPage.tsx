import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { Box, Container, Typography, Button } from "@mui/material";
import { ArrowDownward, Search } from "@mui/icons-material";
import ProductCard from "../../component/ProductCard";
import { getSearchedProductsNextPage } from "../../Helpers/Services/products";
import { searchedProductsNextPage } from "../Home/redux/HomeActions/HomeActions";

const SearchPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(2);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const { searchedResults, totalSearchedProducts } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );
  const startIndex = (pageNumber - 1) * 5;

  const urlParts = location.pathname.split("/");
  const searchValue = urlParts[urlParts.length - 1];

  const handlePageNumber = () => {
    setPageNumber((prev) => prev + 1);
  };
  console.log(startIndex);
  useEffect(() => {
    console.log({ searchValue, startIndex });

    let isCanceled = false;

    const getSearchedNextpageProducts = async () => {
      try {
        const { data } = await getSearchedProductsNextPage(
          searchValue,
          startIndex
        );

        if (!isCanceled) {
          console.log(data);
          dispatch(searchedProductsNextPage(data.products));
        }
      } catch (error) {
        console.log(error);
      }
    };

    getSearchedNextpageProducts();

    return () => {
      isCanceled = true;
    };
  }, [pageNumber]);

  return (
    <Box
      sx={{
        mt: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: "80%" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Search color="error" />
          <Typography variant="h6" color="initial">
            {t("global.search_results")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="h5" color="initial">
            {t("global.found")} {totalSearchedProducts} {t("global.product")}:
            <strong style={{ color: "red" }}>"{searchValue}"</strong>
          </Typography>
        </Box>
      </Box>
      <Container
        maxWidth="lg"
        sx={{
          mb: 5,
          mt: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            p: 3,
          }}
        >
          {searchedResults.map((product) => {
            return (
              <ProductCard key={product.id} product={product}></ProductCard>
            );
          })}
        </Box>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handlePageNumber}
          >
            {t("global.see_more")}
            <ArrowDownward />
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchPage;
