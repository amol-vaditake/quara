import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import "./Home.scss"
function HomePageSlider() {
  return (
    <div>
      <AliceCarousel autoPlay autoPlayInterval="3000">
      <img src="slide2i.png" alt='slide' className="sliderimg"/>
      <img src="slide3i.png" alt='slide' className="sliderimg"/>
      <img src="slidei.png" alt='slide' className="sliderimg"/>

</AliceCarousel>
    </div>
  )
}

export default HomePageSlider
