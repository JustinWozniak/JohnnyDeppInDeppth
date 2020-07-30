import React from 'react';
import CarouselComponent from '../components/elements/Carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Movies = (props) => {
	

	return (
		<div className='carouselWrapper'>
        <CarouselComponent />
		</div>
    )
};

export default Movies;