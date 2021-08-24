import React from 'react';
import Slider from 'react-slick';
import './index.scss';

const SliderComponet = ({ images, showFadeIn }) => {
  const settings = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 3000,
    arrow: false,
    fade: true,
    speed: 1000,
  }

  const sliders = () => {
    return images.map(data => {
      return (
        <div key={data}>
          <img alt="image" src={data} className='image-slide' />
        </div>
      )
    });
  };

  return (
    <div className='component-slider'>
      <Slider {...settings}>
        {sliders()}
      </Slider>
    </div>
  )
};

export default SliderComponet;
