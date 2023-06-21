import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Background, CategoryDisplayOnSlide, SliderImage, SliderTitle } from './sliderStyles';
import { Box, ListItemButton } from '@mui/material';
import { moveToProductPage } from '../../pages/Home/redux/HomeActions/HomeActions';
import { useNavigate } from 'react-router-dom';
import { categories } from '../Header/categories';

const MainSlider = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sliderImages, searchedResults } = useAppSelector<HomeState>((state) => state.homeReducer);

  var settings = {
    dots: true,
    infinite: true,
    speed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    slickNext: false,
    slickPrevious: false,
    swipe: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
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
    <Box sx={{ position: 'relative', mt: 10 }}>
      <CategoryDisplayOnSlide
        sx={{
          zIndex: searchedResults.length > 0 ? 0 : 1
        }}>
        {categories.map((category) => {
          return (
            <ListItemButton
              key={category}
              style={{ color: 'black' }}
              onClick={() => navigate(`/category/${category}`)}>
              {category}
            </ListItemButton>
          );
        })}
      </CategoryDisplayOnSlide>
      <Slider {...settings}>
        {sliderImages.map((product: ProductItem, i) => (
          <Background
            key={i}
            onClick={() => {
              dispatch(moveToProductPage(product));
              navigate(`/product/${product.id}/${product.brand}`);
            }}>
            <SliderTitle variant='h4Montserrat' color="limegreen">
              <strong>{product.brand}: " </strong>
              {product.title} "
            </SliderTitle>
            <SliderImage src={product.images?.[0]} alt={`Tshop ${i}`} />
          </Background>
        ))}
      </Slider>
    </Box>
  );
};

export default MainSlider;
