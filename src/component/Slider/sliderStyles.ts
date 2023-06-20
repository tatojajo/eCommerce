import { styled, Box, Typography } from '@mui/material';
import sliderBg from '../../images/slider-images-bg.jpg';

export const Background = styled(Box)`
  width: 100%;
  height: 400px;
  padding: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${sliderBg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
  @media (max-width: 900px) {
    height: 290px;
  }

  @media (max-width: 600px) {
    max-height: 200px;
  }
`;

export const SliderTitle = styled(Typography)`
  font-size: 20px;
  @media (max-width: 900px) {
    width: 700px;
    font-size: 12px;
  }
  @media (max-width: 600px) {
    font-size: 10px;
  }
`;

export const SliderImage = styled('img')`
  margin: auto;

  @media (max-width: 900px) {
    margin: 10px auto;
    height: 200px;
  }

  @media (max-width: 600px) {
    height: 150px;
  }
`;

export const CategoryDisplayOnSlide = styled(Box)`
  direction: rtl;
  position: absolute;
  top: px;
  height: 440px;
  right: 10%;
  background-color: #f5f5f5;

  &::-webkit-scrollbar {
    width: 0.3em;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 0.25em;
  }
  @media (max-width: 900px) {
    right: 1px;
    overflow-y: auto;
    height: 320px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;
