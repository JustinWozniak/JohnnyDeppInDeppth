import React from 'react';

import { Carousel } from "react-responsive-carousel";
import axios from 'axios';


class CarouselComponent extends React.Component {
  state = {
    movies: [],
    images: []
  };

  async componentDidMount() {
    const { data: movies } = await axios.get(

      ' https://api.themoviedb.org/3/person/85/movie_credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=en-US'
    );
    this.setState({ movies: movies.cast });
    let movieImageUrls = []
    let trendingMoviesCount = this.state.movies.length
    for (let i = 0; i < trendingMoviesCount; i++) {
      const posterPath = "https://image.tmdb.org/t/p/w500"
      movieImageUrls.push(posterPath + movies.cast[i].poster_path);
      this.setState({ images:movieImageUrls })
   
    }  console.log(this.state.images)
  }

  render () {
    const { images } = this.state

    if (!images) return <div>Images are not fetched yet!</div>

    // #3. Finally, render the `<Carousel />` with the state's images.
    return <Carousel autoPlay infiniteLoop='true'  >
      {
        images.map( image => {
          return <div>
            <img  src={ image } alt='Johnny Covers'/>
          
            <p>{ image.name }</p>
          </div>
        })
      }
    </Carousel>
  }
}
    export default CarouselComponent



