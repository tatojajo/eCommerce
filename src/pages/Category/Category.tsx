import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Drawer,
  InputBase,
  List,
  ListItemButton,
  Paper,
  Slider,
  Typography,
  alpha,
  styled
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { categories } from '../../component/Header/categories';
import mainBrands from '../../component/Brands/mainBrands';
import { getFilteredProducts } from '../../Helpers/Services/products';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { saveProductsToFilter } from '../Home/redux/HomeActions/HomeActions';
import { SavedSearch } from '@mui/icons-material';
import ProductCard from '../../component/ProductCard';
function values(value: number) {
  return `${value}$`;
}

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
    // vertical padding + font size from searchIcon
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
  const location = useLocation();
  const pathname = location.pathname.split('/').filter((path) => path !== '');
  const { t } = useTranslation();
  const [priceValue, setPriceValue] = useState<number[]>([40, 20]);
  const [showAllCategories, setShowallCategories] = useState<boolean>(false);
  const [showAllBrands, setShowallBrands] = useState<boolean>(false);
  const [brandValue, setBrandValue] = useState<string>('');
  const [categoryValue, setCategoryValue] = useState<string>(pathname[pathname.length - 1]);
  const dispatch = useAppDispatch();
  const { totalProductsToFilter, productsToFilter } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

  const initialCuantity = 5;
  const productsToRender = 5;

  const displayedCategories = showAllCategories ? categories : categories.slice(0, initialCuantity);
  const displayBrands = showAllBrands ? mainBrands : mainBrands.slice(0, initialCuantity);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceValue(newValue as number[]);
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
  useEffect(() => {
    let isCanceled = false;
    try {
      if (!isCanceled) {
        const getProducts = async () => {
          const { data } = await getFilteredProducts(categoryValue, brandValue);
          dispatch(saveProductsToFilter(data.products, data.total_found));
        };
        getProducts();
      }
    } catch (error) {
      console.log(error);
    }
    return () => {
      isCanceled = true;
    };
  }, [categoryValue, brandValue]);
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
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
          </Search>
        </Paper>
        <Paper sx={{ minWidth: '200px', padding: '10px' }}>
          <Typography variant="h5" color="initial">
            Price Range
          </Typography>
          <Slider
            getAriaLabel={() => 'Temperature range'}
            value={priceValue}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={values}
          />
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
        <Box>
          <Typography variant="h6" color="initial">
            {t('global.brand')}: {brandValue !== '' && <strong>{brandValue}</strong>}
          </Typography>
          <Typography variant="h6" color="initial">
            {t('global.category')}: {categoryValue && <strong>{categoryValue}</strong>}
          </Typography>
        </Box>
        <Paper
          elevation={5}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            padding: '10px',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          {productsToFilter.map((product, index) => {
            return <ProductCard key={index} product={product} />;
          })}
        </Paper>
      </Box>
    </Box>
  );
};

export default Category;
