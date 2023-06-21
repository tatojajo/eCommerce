import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';
import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { ArrowDownward, Search } from '@mui/icons-material';
import ProductCard from '../../component/ProductCard';
import { getSearchedProductsNextPage } from '../../Helpers/Services/products';
import { searchedProductsNextPage } from '../Home/redux/HomeActions/HomeActions';
import { SearchInfoTitle, SearchPageGridCnotainer, SearchedProducts } from './serarchPageStyles';

function productsQuantityOnPage() {
  if (window.innerWidth >= 1282) return 15;
  if (window.innerWidth >= 1094) return 12;
  if (window.innerWidth >= 900) return 9;
  if (window.innerWidth >= 600) return 6;
  return 4;
}

const SearchPage = () => {
  const [pageNumber, setPageNumber] = useState<number>(2);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();

  const { searchedResults, totalSearchedProducts } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );
  const startIndex = (pageNumber - 1) * productsQuantityOnPage();
  
  const urlParts = location.pathname.split('/');
  const searchValue = urlParts[urlParts.length - 1];

  const handlePageNumber = () => {
    setPageNumber((prev) => prev + 1);
  };

  useEffect(() => {
    console.log({ searchValue, startIndex });

    let isCanceled = false;

    const getSearchedNextpageProducts = async () => {
      try {
        const { data } = await getSearchedProductsNextPage(searchValue, startIndex);

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
    <SearchPageGridCnotainer>
      <Box sx={{ width: '80%', textAlign: 'center' }}>
        <SearchInfoTitle>
          <Search color="error" fontSize="large" />
          <Typography variant="h1Montserrat" color="ActiveBorder">
            {t('global.search_results')}
          </Typography>
        </SearchInfoTitle>
        <Box>
          <Typography variant="h1Montserrat" color="initial">
            {t('global.found')} {totalSearchedProducts} {t('global.product')}:
            <strong style={{ color: 'orange' }}>"{searchValue.toUpperCase()}"</strong>
          </Typography>
        </Box>
      </Box>
      <SearchedProducts maxWidth="lg">
        <Grid container spacing={2}>
          {searchedResults.map((product) => {
            return (
              <Grid key={product.id} item xs={12}sm={6}md={4}lg={3} xl={2} >
                <ProductCard key={product.id} product={product}></ProductCard>
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Button variant="outlined" color="secondary" onClick={handlePageNumber}>
            {t('global.see_more')}
            <ArrowDownward />
          </Button>
        </Box>
      </SearchedProducts>
    </SearchPageGridCnotainer>
  );
};

export default SearchPage;
