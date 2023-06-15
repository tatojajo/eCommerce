import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Drawer,
  InputBase,
  List,
  ListItemButton,
  Pagination,
  Paper,
  Slider,
  Stack,
  TextField,
  Typography,
  alpha,
  styled,
  Grid
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { categories } from '../../component/Header/categories';
import mainBrands from '../../component/Brands/mainBrands';
import { getFilteredProducts } from '../../Helpers/Services/products';
import { saveProductsToFilter } from '../Home/redux/HomeActions/HomeActions';
import { SavedSearch } from '@mui/icons-material';
import ProductCard from '../../component/ProductCard';
import useDebounce from '../../Helpers/CustomHooks/useBoolean/useDebounce';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const Category = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = location.pathname.split('/').filter((path) => path !== '');
  const [priceValue, setPriceValue] = useState<number[]>([0, 0]);
  const [showAllCategories, setShowallCategories] = useState<boolean>(false);
  const [showAllBrands, setShowallBrands] = useState<boolean>(false);
  const [brandValue, setBrandValue] = useState<string>('');
  const [categoryValue, setCategoryValue] = useState<string>(pathname[pathname.length - 1]);
  const { totalProductsToFilter, productsToFilter } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );
  const [searchWord, setSeachWord] = useState('');
  const debounceValue = useDebounce(searchWord);

  const [minPrice, setMinPrice] = useState<string | number>('');
  const [maxPrice, setMaxPrice] = useState<string | number>('');

  const initialCuantity = 5;
  const startIndex = (pageNumber - 1) * 10;
  const finalIndex = startIndex + 10;

  const productsPerPage = productsToFilter.slice(startIndex, finalIndex);

  const displayedCategories = showAllCategories ? categories : categories.slice(0, initialCuantity);
  const displayBrands = showAllBrands ? mainBrands : mainBrands.slice(0, initialCuantity);

  const handleApplyPrice = () => {
    const newMinPrice = Number(minPrice);
    const newMaxPrice = Number(maxPrice);

    if (newMinPrice <= newMaxPrice) {
      setPriceValue([newMinPrice, newMaxPrice]);
      const filterPrice: ProductItem[] = productsToFilter.filter((product: ProductItem) => {
        const productPrice = Number(product.price);
        return productPrice >= newMinPrice && productPrice <= newMaxPrice;
      });

      dispatch(saveProductsToFilter(filterPrice, filterPrice.length));
    }
  };

  const handleShowMoreCategories = () => {
    setShowallCategories((prev) => !prev);
  };
  const showMoreBrands = () => {
    setShowallBrands((prev) => !prev);
  };
  const setCategory = (category: string) => {
    setCategoryValue(category);
  };
  const setBrand = (brand: string) => {
    setBrandValue(brand);
  };
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
  };

  useEffect(() => {
    let isCanceled = false;
    let timeForLoading: NodeJS.Timeout | null = null;
    try {
      if (!isCanceled) {
        const getProducts = async () => {
          setLoading(true);
          try {
            const { data } = await getFilteredProducts(categoryValue, brandValue);

            const prices = data.products.map((product: ProductItem) => Number(product.price));
            const maxPrice = Math.max(...prices);
            const minPrice = Math.min(...prices);
            setMinPrice(minPrice);
            setMaxPrice(maxPrice);

            setPriceValue([minPrice, maxPrice]);

            if (debounceValue) {
              const filteredProducts = data.products.filter((product: ProductItem) => {
                const productTitle = product.title.toLowerCase();
                const productDescription = product.description.toLowerCase();
                const debounceValueToLowerCase = debounceValue.toLowerCase();
                const filterResults =
                  productTitle.includes(debounceValueToLowerCase) ||
                  productDescription.includes(debounceValueToLowerCase);

                return filterResults;
              });

              return dispatch(saveProductsToFilter(filteredProducts, filteredProducts.length));
            }

            dispatch(saveProductsToFilter(data.products, data.total_found));
          } catch (error) {
            console.log(error);
          } finally {
            timeForLoading = setTimeout(() => {
              setLoading(false);
            }, 1000);
          }
        };
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isCanceled = true;
      if (timeForLoading) clearTimeout(timeForLoading);
    };
  }, [categoryValue, brandValue, debounceValue]);
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          marginTop: '64px',
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 300,
            overflowY: 'auto',
            boxSizing: 'border-box',
            marginTop: '100px',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
            paddingBottom: '100px'
          }
        }}
        variant="permanent"
        anchor="left">
        <Paper sx={{ minWidth: '200px', padding: '10px' }}>
          <Search>
            <SearchIconWrapper>
              <SavedSearch />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e) => setSeachWord(e.target.value)}
            />
          </Search>
        </Paper>
        <Paper sx={{ minWidth: '200px', padding: '10px' }}>
          <Typography variant="h5" color="initial">
            Price Range
          </Typography>
          <Slider
            getAriaLabel={() => 'Price range'}
            value={priceValue}
            valueLabelDisplay="auto"
            min={priceValue[0]}
            max={priceValue[1]}
          />
          <Grid container spacing={1}>
            <Grid item sm={6}>
              <TextField
                label="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                label="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </Grid>
            <Grid item sm={12} textAlign="center">
              <Button variant="outlined" color="primary" onClick={handleApplyPrice}>
                Apply
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={4} sx={{ minWidth: '150px', padding: '10px' }}>
          <Typography variant="h4" color="initial">
            {t('global.category')}
          </Typography>
          <List>
            {displayedCategories.map((category, index) => {
              return (
                <ListItemButton key={index} onClick={() => setCategory(category)}>
                  {category}
                </ListItemButton>
              );
            })}
          </List>
          {!showAllCategories && categories.length > initialCuantity && (
            <Button onClick={handleShowMoreCategories}>{t('global.see_more')}</Button>
          )}
          {showAllCategories && (
            <Button onClick={handleShowMoreCategories}>{t('global.close')}</Button>
          )}
        </Paper>
        <Paper elevation={4} sx={{ minWidth: '150px', padding: '10px' }}>
          <Typography variant="h4" color="initial">
            {t('global.brand')}
          </Typography>
          <List>
            {displayBrands.map((brand, index) => {
              return (
                <ListItemButton key={index} onClick={() => setBrand(brand.brand)}>
                  {brand.brand}
                </ListItemButton>
              );
            })}
          </List>
          {!showAllBrands && mainBrands.length > initialCuantity && (
            <Button onClick={showMoreBrands}>{t('global.see_more')}</Button>
          )}
          {showAllBrands && <Button onClick={showMoreBrands}>{t('global.close')}</Button>}
        </Paper>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 9 }}>
        <Box
          sx={{
            display: 'flex',
            padding: '30px',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '30px'
          }}>
          <Typography variant="h6" color="initial">
            {t('global.brand')}:{' '}
            {brandValue ? (
              <strong>{brandValue}</strong>
            ) : (
              <strong>{t('global.brand_is_not_selected')}</strong>
            )}
          </Typography>
          <Typography variant="h6" color="initial">
            {t('global.category')}:{' '}
            {categoryValue ? (
              <strong>{categoryValue}</strong>
            ) : (
              <strong>{t('global.category')}</strong>
            )}
          </Typography>
          <Typography variant="h6" color="initial">
            {t('global.total')}:{' '}
            {totalProductsToFilter && (
              <strong>
                {totalProductsToFilter} {t('global.product')}
              </strong>
            )}
          </Typography>
        </Box>
        <Paper
          elevation={5}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              padding: '10px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            {loading ? (
              <Typography variant="body1">
                <CircularProgress color="success" />
              </Typography>
            ) : (
              productsPerPage.map((product, index) => <ProductCard key={index} product={product} />)
            )}
          </Box>
          {productsToFilter && (
            <Box>
              <Stack spacing={2} mt={4}>
                <Pagination
                  count={Math.ceil(totalProductsToFilter / 10)}
                  page={pageNumber}
                  variant="outlined"
                  shape="rounded"
                  onChange={handleChangePage}
                />
              </Stack>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default Category;
