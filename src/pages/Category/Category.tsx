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
  Grid,
  Autocomplete,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { categories } from '../../component/Header/categories';
import mainBrands from '../../component/Brands/mainBrands';
import { getFilteredProducts, productsNextpage } from '../../Helpers/Services/products';
import { saveProductsToFilter } from '../Home/redux/HomeActions/HomeActions';
import { FilterCenterFocus, SavedSearch } from '@mui/icons-material';
import ProductCard from '../../component/ProductCard';
import useDebounce from '../../Helpers/CustomHooks/useBoolean/useDebounce';
import {
  BrandsListContainer,
  CategoryListContainer,
  CategoryPageDrawer,
  CategoyPageContainer,
  DetailsTypography,
  FIlteredProductsContainer,
  FilteredproductsGridContainer,
  KayWordSearchInputConatiner,
  LoaderContainer,
  MobileTabletFilterMenu,
  PriceRangeContainer,
  SelectidFilteriDetails
} from './CategoryStyles';

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

type Brand = {
  brand: string;
  img: string;
};

const Category = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();
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

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const initialCuantity = 5;
  const startIndex = (pageNumber - 1) * 12;
  const finalIndex = startIndex + 12;

  const productsPerPage = productsToFilter.slice(startIndex, finalIndex);

  const displayedCategories = showAllCategories ? categories : categories.slice(0, initialCuantity);
  const displayBrands = showAllBrands ? mainBrands : mainBrands.slice(0, initialCuantity);

  const handleShowMoreCategories = () => {
    setShowallCategories((prev) => !prev);
  };
  const showMoreBrands = () => {
    setShowallBrands((prev) => !prev);
  };
  const setCategory = (category: string) => {
    setCategoryValue(category);
    setPageNumber(1);
  };
  const setBrand = (brand: string) => {
    setBrandValue(brand);
    setPageNumber(1);
  };
  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageNumber(value);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  const handleBrenadSelect = (event: SelectChangeEvent) => {
    setBrandValue(event.target.value);
    setPageNumber(1);
  };

  const handleCategorySelect = (event: SelectChangeEvent) => {
    setCategoryValue(event.target.value);
    setPageNumber(1);
  };
  useEffect(() => {
    let isCanceled = false;
    let loadingTimeout: NodeJS.Timeout;

    const getProducts = async () => {
      setLoading(true);
      try {
        const { data } = await getFilteredProducts(categoryValue, brandValue);

        const prices = data.products.map((product: ProductItem) => Number(product.price));
        const productsMaxPrice = Math.max(...prices);
        const productsMinPrice = Math.min(...prices);
        setPriceValue([productsMinPrice, productsMaxPrice]);

        let filteredProducts = data.products;

        if (debounceValue) {
          const debounceValueToLowerCase = debounceValue.toLowerCase();
          filteredProducts = data.products.filter((product: ProductItem) => {
            const productTitle = product.title.toLowerCase();
            const productDescription = product.description.toLowerCase();
            return (
              productTitle.includes(debounceValueToLowerCase) ||
              productDescription.includes(debounceValueToLowerCase)
            );
          });
        }

        if (minPrice !== 0 || maxPrice !== 0) {
          filteredProducts = filteredProducts.filter((product: ProductItem) => {
            const productPrice = Number(product.price);
            return (
              (minPrice === 0 || productPrice >= minPrice) &&
              (maxPrice === 0 || productPrice <= maxPrice)
            );
          });
        }

        dispatch(saveProductsToFilter(filteredProducts, filteredProducts.length));
      } catch (error) {
        console.log(error);
      } finally {
        loadingTimeout = setTimeout(() => {
          setLoading(false);
        }, 5000);
      }
    };

    getProducts();

    return () => {
      isCanceled = true;
      clearTimeout(loadingTimeout);
    };
  }, [categoryValue, brandValue, debounceValue, minPrice, maxPrice]);
  return (
    <CategoyPageContainer>
      <MobileTabletFilterMenu>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%'
          }}>
          <PriceRangeContainer>
            <Grid container spacing={1}>
              <Grid item sm={6} xs={6}>
                <TextField
                  size="small"
                  label="Min Price"
                  value={minPrice}
                  onChange={(e) => setMinPrice(Number(e.target.value))}
                />
              </Grid>
              <Grid item sm={6} xs={6}>
                <TextField
                  size="small"
                  label="Max Price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </Grid>
            </Grid>
          </PriceRangeContainer>
          <Paper>
            <FormControl sx={{ m: 1, minWidth: 80 }} size="small">
              <InputLabel>Brands</InputLabel>
              <Select value={brandValue} onChange={handleBrenadSelect} autoWidth label="Brand">
                {mainBrands.map((brand) => {
                  return (
                    <MenuItem value={brand.brand} key={brand.brand}>
                      {brand.brand}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Paper>
          <Paper>
            <FormControl sx={{ m: 1, maxWidth: 80 }} size="small">
              <InputLabel>Categories</InputLabel>
              <Select
                value={categoryValue}
                onChange={handleCategorySelect}
                autoWidth
                label="Categories">
                {categories.map((category) => {
                  return (
                    <MenuItem value={category} key={category}>
                      {category}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Paper>
        </Box>
        <KayWordSearchInputConatiner>
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
        </KayWordSearchInputConatiner>
      </MobileTabletFilterMenu>
      <CategoryPageDrawer variant="permanent" anchor="left">
        <KayWordSearchInputConatiner>
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
        </KayWordSearchInputConatiner>
        <PriceRangeContainer>
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
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </Grid>
            <Grid item sm={6}>
              <TextField
                label="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </Grid>
          </Grid>
        </PriceRangeContainer>
        <CategoryListContainer elevation={4}>
          <Typography variant="h1Montserrat" color="initial">
            {t('global.categories')}
          </Typography>
          <List>
            {displayedCategories.map((category, index) => {
              return (
                <ListItemButton
                  key={index}
                  onClick={() => {
                    navigate(`/category/${category}`);
                    setCategory(category);
                  }}>
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
        </CategoryListContainer>
        <BrandsListContainer elevation={4}>
          <Typography variant="h1Montserrat" color="initial">
            {t('global.brands')}
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
        </BrandsListContainer>
      </CategoryPageDrawer>

      <FIlteredProductsContainer component="main">
        <SelectidFilteriDetails>
          <DetailsTypography variant="h2Montserrat" color="initial">
            {t('global.brand')}:{' '}
            {brandValue ? (
              <strong>{brandValue}</strong>
            ) : (
              <strong style={{ color: 'red' }}>{t('global.brand_is_not_selected')}!</strong>
            )}
          </DetailsTypography>
          <DetailsTypography variant="h2Montserrat" color="initial">
            {t('global.category')}:{' '}
            {categoryValue ? (
              <strong>{categoryValue}</strong>
            ) : (
              <strong>{t('global.category')}</strong>
            )}
          </DetailsTypography>
          <DetailsTypography variant="h2Montserrat" color="initial">
            {t('global.total')}:{' '}
            {totalProductsToFilter && (
              <strong>
                {totalProductsToFilter} {t('global.product')}
              </strong>
            )}
          </DetailsTypography>
        </SelectidFilteriDetails>

        <FilteredproductsGridContainer>
          {loading ? (
            <LoaderContainer sx={{ gridTemplateColumns: loading && '1fr 1fr' }}>
              <CircularProgress color="success" />
            </LoaderContainer>
          ) : (
            productsPerPage.map((product, index) => {
              return (
                <Box key={index}>
                  <ProductCard product={product} />
                </Box>
              );
            })
          )}
        </FilteredproductsGridContainer>

        {productsToFilter && (
          <Box>
            <Stack spacing={2} mt={4}>
              <Pagination
                count={Math.ceil(totalProductsToFilter / 12)}
                page={pageNumber}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
              />
            </Stack>
          </Box>
        )}
      </FIlteredProductsContainer>
    </CategoyPageContainer>
  );
};

export default Category;
