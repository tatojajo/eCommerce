import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { selectedBrandProducts } from '../../Helpers/Services/products';
import mainBrands from '../../component/Brands/mainBrands';
import { ListItemButton, ListItemText, Typography, Grid, Stack, Pagination } from '@mui/material';
import { setSelectedBrandProducts } from '../Home/redux/HomeActions/HomeActions';

import {
  BrandPageContainer,
  BrandImageContainer,
  BrandImage,
  BrandProductsTitle,
  ProductTitle,
  CategoryTitle
} from './BrandPageStyle';
import ProductCard from '../../component/ProductCard';
import { AllInclusive, MobileFriendly, Tv, Watch } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

function productsQuantityOnPage() {
  if (window.innerWidth >= 1200) return 15;
  if (window.innerWidth >= 900) return 8;
  if (window.innerWidth >= 600) return 6;
  return 4;
}
const BrandPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [brandItem, setBrandItem] = useState<string>('');
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalBrandProducts, setTotalBrandsProducts] = useState<number>(0);
  const { selectedBrand, selectedBrandsProducts } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

  const startIndex = (pageNumber - 1) * productsQuantityOnPage();

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: React.SetStateAction<number>
  ) => {
    setPageNumber(value);
  };

  useEffect(() => {
    const getSelectedBrandProducts = async () => {
      try {
        const { data } = await selectedBrandProducts(
          selectedBrand,
          brandItem,
          startIndex,
          productsQuantityOnPage()
        );
        dispatch(setSelectedBrandProducts(data.products));
        setTotalBrandsProducts(data.total_found);
      } catch (error) {}
    };
    getSelectedBrandProducts();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [selectedBrand, brandItem, pageNumber]);

  return (
    <BrandPageContainer>
      <BrandImageContainer>
        {mainBrands.map((brand) => {
          if (brand.brand === selectedBrand) {
            return <BrandImage key={brand.brand} src={brand.img} alt={brand.brand} />;
          }
        })}
      </BrandImageContainer>
      <BrandProductsTitle>
        <ProductTitle>
          <ListItemButton
            sx={{ gap: '6px' }}
            onClick={() => {
              setPageNumber(1);
              setBrandItem('');
            }}>
            <AllInclusive style={{ fontSize: '10px' }} />
            <CategoryTitle>{t('global.all')}</CategoryTitle>
          </ListItemButton>
        </ProductTitle>
        <ProductTitle>
          <ListItemButton
            sx={{ gap: '6px' }}
            onClick={() => {
              setPageNumber(1);
              setBrandItem('Mobile');
            }}>
            <MobileFriendly style={{ fontSize: '10px' }} />
            <ListItemText>{t('global.phone')}</ListItemText>
          </ListItemButton>
        </ProductTitle>
        <ProductTitle>
          <ListItemButton
            sx={{ gap: '6px' }}
            onClick={() => {
              setPageNumber(1);
              setBrandItem('tv');
            }}>
            <Tv style={{ fontSize: '10px' }} />
            <ListItemText>{t('global.tv')}</ListItemText>
          </ListItemButton>
        </ProductTitle>
        <ProductTitle>
          <ListItemButton
            sx={{ gap: '6px' }}
            onClick={() => {
              setPageNumber(1);
              setBrandItem('watch');
            }}>
            <Watch style={{ fontSize: '10px' }} />
            <ListItemText>{t('global.watch')}</ListItemText>
          </ListItemButton>
        </ProductTitle>
      </BrandProductsTitle>

      <Grid container spacing={2} p={3}>
        {selectedBrandsProducts.map((product) => {
          return (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <ProductCard product={product} />
            </Grid>
          );
        })}

        {selectedBrandsProducts.length === 0 && (
          <Grid container justifyContent="center">
            <Typography variant="h1Montserrat" color="initial">
              {t('global.results_not_found')}
            </Typography>
          </Grid>
        )}
        {selectedBrandsProducts.length > 0 && (
          <Grid container justifyContent="center">
            <Stack spacing={2} mt={4}>
              <Pagination
                count={Math.ceil(totalBrandProducts / productsQuantityOnPage())}
                page={pageNumber}
                variant="text"
                shape="circular"
                onChange={handleChangePage}
              />
            </Stack>
          </Grid>
        )}
      </Grid>
    </BrandPageContainer>
  );
};

export default BrandPage;
