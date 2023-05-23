import { useAppSelector } from "../../redux/hooks";

import "./Slider.scss";
import Carousel from "react-material-ui-carousel";

const Slider = () => {
  const { sliderImages } = useAppSelector((state) => state);

  return (
    <Carousel
      autoPlay={false}
      indicators={false}
      className="home__carousel"
      navButtonsAlwaysVisible={true}
      navButtonsAlwaysInvisible={false}
    >
      {sliderImages.map((item, i) => (
        <img key={i} src={item} alt={`Tshop ${i}`} className="home__image" />
      ))}
    </Carousel>
  );
};

export default Slider;


