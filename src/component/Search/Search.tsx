import { FC, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Box, CardContent, CardMedia, Paper, Typography, Button, Grid } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import {
  moveToProductPage,
  saveSearchedProducts
} from '../../pages/Home/redux/HomeActions/HomeActions';
import { getSearchedProducts } from '../../Helpers/Services/products';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { CardContainer, ProductLink } from '../ProductCard/ProductCardStyle';

type SearchProps = {
  debouncedValue: string;
};

const Search: FC<SearchProps> = ({ debouncedValue }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { searchedResults } = useAppSelector<HomeState>((state) => state.homeReducer);

  useEffect(() => {
    let isCanceled = false;

    const fetchData = async () => {
      try {
        const searchedProducts = async () => {
          const { data } = await getSearchedProducts(debouncedValue);
          if (!isCanceled) {
            dispatch(saveSearchedProducts(data.products, data.total_found));
          }
        };
        searchedProducts();
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {
      isCanceled = true;
    };
  }, [debouncedValue]);
  return (
    <Box sx={{ zIndex: 1 }}>
      {searchedResults.length >= 0 && (
        <Paper
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '10px',
            backdropFilter: 'blur(5px)',
            padding: '20px'
          }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon color="error" />
            {searchedResults.length > 0 ? (
              <Typography variant="h3Montserrat" color="initial">
                {t('global.search_results')}
              </Typography>
            ) : (
              <Typography variant="h2Montserrat" color="initial">
                {t('global.results_not_found')}
              </Typography>
            )}
          </Box>
          <Grid container spacing={2}>
            {searchedResults.map((product, index) => {
              return ( 
                index <= 5 && (
                  <Grid key={product.id} item xs={12} sm={4} md={3}>
                    <Paper elevation={10}>
                      <CardContainer>
                        <CardMedia
                          component="div"
                          sx={{
                            height: '140px',
                            width: '140px'
                          }}>
                          <img
                            src={product.images[0]}
                            alt={product.title}
                            style={{ height: '100%', width: '100%' }}
                          />
                        </CardMedia>
                        <CardContent>
                          <ProductLink
                            to={`/product/${product.categories}/${product.brand}`}
                            onClick={() => dispatch(moveToProductPage(product))}>
                            {product.title}
                          </ProductLink>

                          <Typography
                            variant="body2"
                            color="error"
                            sx={{ marginTop: '10px', fontWeight: '900' }}>
                            {t('global.price')}: ${Number(product.price).toFixed(2)}
                          </Typography>
                        </CardContent>
                      </CardContainer>
                    </Paper>
                  </Grid>
                )
              );
            })}
          </Grid>
          {searchedResults.length > 0 && (
            <Button
              variant="text"
              onClick={() => {
                navigate(`/search/${debouncedValue}`);
              }}>
              {t('global.see_more')}
            </Button>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default Search;
