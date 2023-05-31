import { styled, Box } from "@mui/material";
import sliderBg from "../../images/slider-images-bg.jpg";

export const Background = styled(Box)`
  width: 100%;
  height: 400px;
  padding: 10px;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${sliderBg});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  object-fit: cover;
  cursor: pointer;
  border-radius: 5px;
`;
