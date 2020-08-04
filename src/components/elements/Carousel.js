import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import Moment from 'moment';

class CarouselComponent extends React.Component {
	state = {};

	async componentDidMount() {
		const { data: movies } = await axios.get(
			' https://api.themoviedb.org/3/person/85/movie_credits?api_key=' +
				process.env.REACT_APP_API_KEY +
				'&sort_by=release_date.desc'
		);
		this.setState({ movies: movies.cast });

		let movieImageUrls = [];
		let movieTitles = [];
		let johnnyCharacter = [];
		let original_title = [];
		let overview = [];
		let popularity = [];
		let release_date = [];
		let title = [];
		let vote_average = [];

		let trendingMoviesCount = this.state.movies.length;
		for (let i = 0; i < trendingMoviesCount; i++) {
			const posterPath = 'https://image.tmdb.org/t/p/w500';

			movieImageUrls.push(posterPath + movies.cast[i].poster_path);
			movieTitles.push(this.state.movies[i].original_title);
			johnnyCharacter.push(movies.cast[i].character);
			original_title.push(movies.cast[i].original_title);
			overview.push(movies.cast[i].overview);
			popularity.push(movies.cast[i].popularity);
			release_date.push(movies.cast[i].release_date);
			title.push(movies.cast[i].title);
			vote_average.push(movies.cast[i].vote_average);

			this.setState({
				images: movieImageUrls,
				originaltitle: original_title,
				overviews: overview,
				popularitys: popularity,
				releasedates: release_date,
				titles: title,
				voteaverages: vote_average
			});
		}
	}

	render() {
		const { images } = this.state;
		let originaltitle = this.state.titles;
		let moviesoverview = this.state.overviews;
		let datereleased = this.state.releasedates;
		let fanPopularity = this.state.popularitys;

		if (!images) return <div>Please wait while images load....</div>;

		// #3. Finally, render the `<Carousel />` with the state's images.
		return (
			<Carousel autoPlay infiniteLoop="true" dots="false" showIndicators={false}>
				{images.map((image, name) => {
					let formattedDate = Moment(datereleased[name]).format('MMM D YYYY');
					return (
						<div>
							<img src={image} alt="Johnny Covers" />
							<h1>{originaltitle[name]}</h1>
							<p>{moviesoverview[name]}</p>
							<p>Release Date: {formattedDate}</p> <p>Fan Popularity: {fanPopularity[name]}</p>
						</div>
					);
				})}
			</Carousel>
		);
	}
}
export default CarouselComponent;
