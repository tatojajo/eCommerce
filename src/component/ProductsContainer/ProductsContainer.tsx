import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/hooks';
import {
  saveProductsData,
  saveProductsTotalAmount,
  nextPage,
  changePageNumber,
  saveSliderImages
} from '../../pages/Home/redux/HomeActions/HomeActions';
import { getAllProducts, productsNextpage } from '../../Helpers/Services/products';
import { useTranslation } from 'react-i18next';

import ProductCard from '../ProductCard';

import MainSlider from '../Slider/Slider';
import {
  HomePageContainer,
  HotOffers,
  HotOffersContainer,
  MainContainer,
  PaginationContainer,
  ProductContainer
} from './ProductsContainer.Style';
import { Pagination, Stack, Typography } from '@mui/material';
import { Whatshot } from '@mui/icons-material';

const ProductsContainer = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, totalProducts, pageNumber } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );

  function productsQuantityOnPage() {
    if (window.innerWidth >= 1282) return 15;
    if (window.innerWidth >= 1094) return 12;
    if (window.innerWidth >= 900) return 9;
    if (window.innerWidth >= 600) return 6;
    return 4;
  }
  const startIndex = (pageNumber - 1) * productsQuantityOnPage();
  const pageSize = productsQuantityOnPage();

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(changePageNumber(value));
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (pageNumber > 1) {
          const { data } = await productsNextpage(pageSize, startIndex);
          console.log(data.products);
          dispatch(nextPage(data.products));
        } else {
          const { data } = await getAllProducts(pageSize, startIndex);
          console.log(data.products);
          dispatch(saveProductsData(data.products));
          dispatch(saveProductsTotalAmount(data.total_found));
          dispatch(saveSliderImages(data.products));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [productsQuantityOnPage(), startIndex]);
  return (
    <MainContainer>
      <HomePageContainer>
       
        <HotOffersContainer>
          <HotOffers>
            <Whatshot fontSize="large" color="error" />
            <Typography variant='h2Montserrat'>{t('global.hot_offers')}</Typography>
          </HotOffers>
          <ProductContainer>
            {products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
          </ProductContainer>
        </HotOffersContainer>

        <PaginationContainer>
          <Stack spacing={2} mt={4}>
            <Pagination
              count={Math.ceil(totalProducts / productsQuantityOnPage())}
              page={pageNumber}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
            />
          </Stack>
        </PaginationContainer>
      </HomePageContainer>
    </MainContainer>
  );
};

export default ProductsContainer;
