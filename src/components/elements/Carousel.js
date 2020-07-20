import React from 'react';

import { Carousel } from "react-responsive-carousel";
import axios from 'axios';


class CarouselComponent extends React.Component {
  state = {
    movies: []
  };

  async componentDidMount() {
    const { data: movies } = await axios.get(

      ' https://api.themoviedb.org/3/person/85/movie_credits?api_key=' + process.env.REACT_APP_API_KEY + '&language=en-US'
    );
    this.setState({ movies: movies.cast });
  
    let movieImageUrls = []
    let movieNumbers = []
    let trendingMoviesCount = this.state.movies.length
    for (let i = 0; i < trendingMoviesCount; i++) {
      movieImageUrls.push(movies.cast[i].poster_path);
      movieNumbers.push(movies.cast[i].id)
     
    } 
  }

  render(){
    const posterPath = "https://image.tmdb.org/t/p/w500/"
    return(
   <div>
      {this.state.movies.map((images, index) => {
        console.log(images.poster_path)
        return(
        <div>
    <Carousel>
      <img alt={index} src={posterPath +images.poster_path} />
      <p className="legend">Legend 1</p>
      
    </Carousel>
</div>    
        )}
    

    )}</div>
    )}
}
    export default CarouselComponent



