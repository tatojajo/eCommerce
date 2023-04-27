import React,{useState} from 'react'
import { Box, Container } from '@mui/material'
import Carusel from 'react-material-ui-carousel'


// * slider compoenet
import SimpleImageSlider from 'react-simple-image-slider'

// * conetxt
import { useProducts } from '../../Redux/ProductStore/ProductStroreContext'

import './Slider.scss'
import Carousel from 'react-material-ui-carousel'
const Slider = ()=>{
    const [imageIndex, setImageIndex] = useState(0)
    const {sliderImages} = useProducts()

    return (
        <div className='carusel__images-wrapper'>
        <Carousel
          autoPlay={false}
          indicators={false}
          className="home__carousel"
          navButtonsAlwaysVisible={true}
          navButtonsAlwaysInvisible={false}
        >
          {sliderImages.map((item, i) => (
            <img
              key={i}
              src={item.url}
              alt={`Tshop ${i}`}
              className="home__image"
            />
          ))}
        </Carousel>
      </div>
    )
}

export default Slider