import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import mainBrands from './mainBrands';
import { Box, Typography } from '@mui/material';
import { BrandImage, BrandPaper, PopularBrandsTitle } from './BrandsStyles';
import Slider from 'react-slick';

import { useTranslation } from 'react-i18next';
import { selectBrand } from '../../pages/Home/redux/HomeActions/HomeActions';
import { Beenhere } from '@mui/icons-material';

const Brands = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const settings = {
    dots: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slickNext: false,
    slickPrevious: false,
    swipe: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          infinite: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Box
      sx={{
        width: '95%'
      }}>
      <PopularBrandsTitle>
        <Beenhere fontSize="large" color="info" />
        <Typography variant='h2Montserrat' color="initial">
          {t('global.the_ most_popular_brands')}
        </Typography>
      </PopularBrandsTitle>
      <Slider {...settings}>
        {mainBrands.map((brand, index) => {
          return (
            <BrandPaper
              key={index}
              onClick={() => {
                dispatch(selectBrand(brand.brand));
                navigate(`/brand/${brand.brand}`);
              }}>
              <BrandImage src={brand.img} alt={brand.brand} />
            </BrandPaper>
          );
        })}
      </Slider>
    </Box>
  );
};
export default Brands;
