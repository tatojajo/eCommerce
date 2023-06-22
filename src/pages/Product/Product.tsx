import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { useTranslation } from 'react-i18next';

import {
  addProductCart,
  moveToProductPage,
  saveSimilarProducts
} from '../Home/redux/HomeActions/HomeActions';

import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  ArrowDropDown,
  ArrowDropUp,
  ArrowLeft,
  ArrowRight,
  ContentPasteSearch,
  Description as DescriptionIcon,
  LabelImportant,
  ShoppingBag,
  ShoppingCart
} from '@mui/icons-material';
import {
  ProductInfoWrapper,
  ProductImagesContainer,
  SliderImageWraper,
  Image,
  ProductDescription,
  ProductBtns,
  ProductConatiner,
  ProductTitle,
  ProductBrand,
  ProductImage,
  SimilarProductsButtons,
  SimilarProductsContainer,
  SimilarProductsHeader,
  MainImageWrapper,
  QuantityContainer
} from './ProductPageStyle';
import { relatedProducts, selectedBrandProducts } from '../../Helpers/Services/products';
import ProductCard from '../../component/ProductCard';
import Description from './Description';
import { isAuthenticated } from '../../Helpers/Auth/isAuthenticated';

function similarProductsQuantity() {
  if (window.innerWidth >= 1536) return 6;
  if (window.innerWidth >= 1370) return 4;
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 900) return 4;
  if (window.innerWidth >= 600) return 4;
  return 4;
}

const productColors = ['#d32f2f', '#0288d1', '#ed6c02', '#ffffff'];

const Product = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [productImage, setProductImage] = useState<number>(0);
  const [color, setColor] = useState<string>('#ffffff');
  console.log(color);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState<boolean>(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const { selectedProduct, similarProducts, productsToFilter } = useAppSelector<HomeState>(
    (state) => state.homeReducer
  );
  console.log(similarProducts);
  const increaseQuntity = () => {
    const increasedQuantity = selectedProduct && {
      ...selectedProduct,
      quantity: selectedProduct.quantity + 1
    };
    dispatch(moveToProductPage(increasedQuantity!));
  };

  const decreaseQuantity = () => {
    if (selectedProduct?.quantity === 1) return;
    const decreasedQuantity = selectedProduct && {
      ...selectedProduct,
      quantity: selectedProduct?.quantity - 1
    };
    dispatch(moveToProductPage(decreasedQuantity!));
  };
  const startIndex = (pageNumber - 1) * similarProductsQuantity();
  const pageSize = similarProductsQuantity();

  const hanldleNextSimilarProducts = () => {
    if (similarProducts.length < similarProductsQuantity()) return;
    setPageNumber((prev) => prev + 1);
  };
  const hanldlePrevSimilarProducts = () => {
    setPageNumber((prev) => prev - 1);
  };

  const handleCloseDetails = () => {
    setIsDescriptionOpen(false);
  };

  const handleByNow = async () => {
    if (isAuthenticated().isAdmin || isAuthenticated().isUser) {
      await fetch('http://localhost:4000/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ items: [selectedProduct] })
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          if (response.url) {
            window.location.assign(response.url); // Forwarding user to Stripe
          }
        });
    }
  };

  useEffect(() => {
    try {
      const similarProducts = async () => {
        const { data } = await relatedProducts(selectedProduct!.brand, startIndex, pageSize);
        if (data.total_found === 1) return setPageNumber((prev) => prev);
        dispatch(saveSimilarProducts(data.products));
      };
      similarProducts();
    } catch (error) {
      console.log(error);
    }
  }, [selectedProduct!.id, pageNumber]);

  return (
    <ProductConatiner>
      <ProductInfoWrapper>
        <ProductImagesContainer>
          <SliderImageWraper>
            {selectedProduct?.images.map((image, index) => {
              return (
                index < 4 && (
                  <Image
                    key={index}
                    src={image}
                    index={index}
                    productImage={productImage}
                    onClick={() => setProductImage(index)}
                    alt="image"
                  />
                )
              );
            })}
          </SliderImageWraper>
          <MainImageWrapper>
            <ProductImage
              src={selectedProduct?.images[productImage]}
              alt={selectedProduct?.title}
              style={{
                backgroundColor: `${color}`
              }}
            />
          </MainImageWrapper>
        </ProductImagesContainer>
        <ProductDescription>
          <ProductTitle variant="h6" color="initial">
            {selectedProduct?.title}
          </ProductTitle>
          <ProductBrand variant="h6" color="initial">
            <LabelImportant color="info" />
            {t('global.brand')}: <strong>{selectedProduct?.brand}</strong>
          </ProductBrand>
          <Typography variant="h6" color="initial">
            <strong>{t('global.category')}</strong>: {selectedProduct?.categories}
          </Typography>
          <Box>
            <strong>{t('global.colors')}:</strong>
            {productColors.map((imageColor, index) => {
              return (
                <IconButton key={imageColor} onClick={() => setColor(imageColor)}>
                  <Box
                    sx={{
                      width: '18px',
                      height: '18px',
                      bgcolor: imageColor,
                      borderRadius: '50px'
                    }}></Box>
                </IconButton>
              );
            })}
          </Box>
          <Typography variant="h6" color="initial">
            <strong>{t('global.price')}: </strong>${Number(selectedProduct?.price).toFixed(2)}
          </Typography>
          <ProductBtns>
            <Button
              variant="contained"
              color="primary"
              onClick={() => dispatch(addProductCart(selectedProduct!))}>
              {t('global.add')} <ShoppingCart />
            </Button>
            <Button onClick={handleByNow} variant="contained" color="secondary">
              {t('global.buy_now')}
              <ShoppingBag />
            </Button>
            <QuantityContainer>
              <Typography variant="h5" color="initial">
                <strong>Qty: </strong>
                <span style={{ color: 'red', fontWeight: 700 }}>{selectedProduct?.quantity}</span>
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <IconButton onClick={increaseQuntity}>
                  <ArrowDropUp />
                </IconButton>
                <IconButton onClick={decreaseQuantity}>
                  <ArrowDropDown />
                </IconButton>
              </Box>
            </QuantityContainer>
          </ProductBtns>
          <Button variant="outlined" onClick={() => setIsDescriptionOpen(true)}>
            <DescriptionIcon color="info" /> {t('global.more_info')}
          </Button>
        </ProductDescription>
      </ProductInfoWrapper>

      <SimilarProductsContainer>
        <SimilarProductsHeader>
          <Typography variant="h2Montserrat" color="initial">
            <ContentPasteSearch color="success" /> {t('global.related_products')}
          </Typography>
          <SimilarProductsButtons>
            <Button variant="outlined" onClick={hanldlePrevSimilarProducts}>
              <ArrowLeft />
            </Button>
            <Button variant="outlined" onClick={hanldleNextSimilarProducts}>
              <ArrowRight />
            </Button>
          </SimilarProductsButtons>
        </SimilarProductsHeader>
        <Grid
          container
          spacing={1}
          sx={{
            marginTop: '30px'
          }}>
          {similarProducts.map((product, index) => {
            return (
              <Grid key={product.id} item xs={12} sm={6} md={3} lg={3} xl={2}>
                <ProductCard key={index} product={product} />
              </Grid>
            );
          })}
        </Grid>
      </SimilarProductsContainer>
      <Description
        isDescriptionOpen={isDescriptionOpen}
        handleCloseDetails={handleCloseDetails}
        selectedProduct={selectedProduct}
      />
    </ProductConatiner>
  );
};

export default Product;
