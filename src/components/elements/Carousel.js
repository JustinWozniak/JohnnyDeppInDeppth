import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';

class CarouselComponent extends React.Component {
	state = {
		movies: [],
    images: [],
    titles:[]
	};

	async componentDidMount() {
		const { data: movies } = await axios.get(
			' https://api.themoviedb.org/3/person/85/movie_credits?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&sort_by=release_date.desc'
		);
		this.setState({ movies: movies.cast });
		console.log(this.state.movies)
    let movieImageUrls = [];
    let movieTitles = []
		let trendingMoviesCount = this.state.movies.length;
		for (let i = 0; i < trendingMoviesCount; i++) {
			const posterPath = 'https://image.tmdb.org/t/p/w500';
      movieImageUrls.push(posterPath + movies.cast[i].poster_path);
      movieTitles.push(this.state.movies[i].original_title)
      this.setState({ images: movieImageUrls });
      this.setState({ titles: movieTitles });
     
		}
	
	}

	render() {
    const { images } = this.state;
    let {movieTitleToDisplay} = this.state.titles

		if (!images) return <div>Please wait while images load....</div>;
    
		// #3. Finally, render the `<Carousel />` with the state's images.
		return (
			<Carousel autoPlay infiniteLoop="true" dots="false" showIndicators={false}>
				{images.map((image) => {
					return (
						<div>
							<img src={image} alt="Johnny Covers" />
          
					
						</div>
					);
				})}
        <p>{movieTitleToDisplay}</p>
			</Carousel>
      
		);
	}
}
export default CarouselComponent;
