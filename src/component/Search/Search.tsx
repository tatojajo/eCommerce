import { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";

import {
  Box,
  CardContent,
  CardMedia,
  Paper,
  Typography,
  Button,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { CardContainer, ProductLink } from "../ProductCard/ProductCardStyle";

import {
  moveToProductPage,
  saveSearchedProducts,
} from "../../pages/Home/redux/HomeActions/HomeActions";
import { getSearchedProducts } from "../../Helpers/Services/products";

type SearchProps = {
  debouncedValue: string;
};

const Search: FC<SearchProps> = ({ debouncedValue }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [seeMore, setSeeMore] = useState<boolean>(false);
  const { searchedResults } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

  const handleSeeMore = () => {
    setSeeMore((prev) => !prev);
  };
  useEffect(() => {
    console.log(seeMore);
    const fetchData = async () => {
      try {
        const searchedProducts = async () => {
          const { data } = await getSearchedProducts(debouncedValue);
          dispatch(saveSearchedProducts(data.products, data.total_found));
        };
        searchedProducts();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    console.log("hello");
  }, [debouncedValue, seeMore]);
  return (
    <Box>
      {searchedResults.length >= 0 && (
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "10px",
            backdropFilter: "blur(5px)",
            padding: "20px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SearchIcon color="error" />
            {searchedResults.length > 0 ? (
              <Typography variant="h3" color="initial">
                {t("global.search_results")}
              </Typography>
            ) : (
              <Typography variant="h3" color="initial">
                {t("global.results_not_found")}
              </Typography>
            )}
          </Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            {searchedResults.map((product) => {
              return (
                <Paper elevation={10}>
                  <CardContainer>
                    <CardMedia
                      component="div"
                      sx={{
                        height: "140px",
                        width: "140px",
                      }}
                    >
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        style={{ height: "100%", width: "100%" }}
                      />
                    </CardMedia>
                    <CardContent>
                      <ProductLink
                        to={`/product/${product.categories}/${product.brand}`}
                        onClick={() => dispatch(moveToProductPage(product))}
                      >
                        {product.title}
                      </ProductLink>

                      <Typography
                        variant="body2"
                        color="error"
                        sx={{ marginTop: "10px", fontWeight: "900" }}
                      >
                        {t("global.price")}: ${Number(product.price).toFixed(2)}
                      </Typography>
                    </CardContent>
                  </CardContainer>
                </Paper>
              );
            })}
          </Box>
          {searchedResults.length > 0 && (
            <Button
              variant="text"
              onClick={() => {
                navigate(`/search/${debouncedValue}`);
                handleSeeMore();
              }}
            >
              See More
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Search;
