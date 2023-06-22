import ProductsContainer from '../../component/ProductsContainer';
import Brands from '../../component/Brands';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/material';
import MainSlider from '../../component/Slider/Slider';
import Header from '../../component/Header';

const Home = () => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
      <MainSlider />
      <ProductsContainer />
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: '50px'
        }}>
        <Brands />
      </Box>
    </Box>
  );
};

export default Home;
