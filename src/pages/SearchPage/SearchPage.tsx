import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useTranslation } from "react-i18next";
import { Box, Container, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import ProductCard from "../../component/ProductCard";

const SearchPage = () => {
  const { t } = useTranslation();
  const { searchedResults, totalSearchedProducts } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

  const location = useLocation();

  const urlParts = location.pathname.split("/");
  const searchValue = urlParts[urlParts.length - 1];

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
            <strong style={{ color: "red" }}>{searchValue}</strong>
          </Typography>
        </Box>
      </Box>
      <Container maxWidth="lg" sx={{mt:3,}}>
        <Box
          sx={{
            bgcolor: "#cfe8fc",
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            p:3
          }}
        >
          {searchedResults.map((product) => {
            return (
              <ProductCard key={product.id} product={product}></ProductCard>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default SearchPage;
