import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Background } from './sliderStyles';
import { Box, ListItem, ListItemButton, Typography } from '@mui/material';
import { moveToProductPage } from '../../pages/Home/redux/HomeActions/HomeActions';
import { useNavigate } from 'react-router-dom';
import { categories } from '../Header/categories';

const MainSlider = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { sliderImages } = useAppSelector<HomeState>((state) => state.homeReducer);

  var settings = {
    dots: true,
    infinite: true,
    speed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    slickNext: false,
    slickPrevious: false,
    swipe: true,
    arrows: false
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          zIndex: '1',
          overflowY: 'scroll',
          height: '420px',
          left: '10%',
          '&::-webkit-scrollbar': {
            width: '0.3em'
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent'
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '0.25em'
          }
        }}>
        {categories.map((category) => {
          return (
            <ListItemButton
            key={category}
              style={{ color: 'white' }}
              onClick={() => navigate(`/category/${category}`)}>
              {category}
            </ListItemButton>
          );
        })}
      </Box>
      <Slider {...settings}>
        {sliderImages.map((product: ProductItem, i) => (
          <Background
            key={i}
            onClick={() => {
              dispatch(moveToProductPage(product));
              navigate(`/product/${product.id}/${product.brand}`);
            }}>
            <Typography variant="h2" color="limegreen">
              <strong>{product.brand}: " </strong>
              {product.title} "
            </Typography>
            <img
              src={product.images?.[0]}
              alt={`Tshop ${i}`}
              style={{
                margin: '25px auto'
              }}
            />
          </Background>
        ))}
      </Slider>
    </Box>
  );
};

export default MainSlider;
