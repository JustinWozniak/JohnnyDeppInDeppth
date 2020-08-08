import React from 'react';

import { Carousel } from 'react-responsive-carousel';
import axios from 'axios';
import Moment from 'moment';

class CarouselComponent extends React.Component {
	state = {};

	async componentDidMount() {
		const { data: movies } = await axios.get(
			' 	https://api.themoviedb.org/3/person/85/combined_credits?api_key=' +
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
		let movies_id = [];

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
			movies_id.push(movies.cast[i].id);

		
		} //end of loop
		this.setState({
			images: movieImageUrls,
			originaltitle: original_title,
			overviews: overview,
			popularitys: popularity,
			releasedates: release_date,
			titles: title,
			voteaverages: vote_average,
			moviesId: movies_id
		});
		// this.fetchMoviesData(58);
	}

	fetchMoviesData(moviesIdtoFetch) {
		fetch(
			`https://api.themoviedb.org/3/movie/${moviesIdtoFetch}?api_key=abb02fcc5fa2b30465f423cf48076a7e&language=en-US`
		)
			.then((response) => response.json())
			.then((data) =>
				this.setState({
					budget: data.budget,
					genres: data.genres,
					belongs_to_collection: data.belongs_to_collection,
					homepage: data.homepage,
					original_language: data.original_language,
					production_companies: data.production_companies,
					revenue: data.revenue,
					runtime: data.runtime,
					status: data.status,
					tagline: data.tagline
				})
			);
	}

	render() {
		const { images } = this.state;
		let originaltitle = this.state.titles;
		let moviesoverview = this.state.overviews;
		let datereleased = this.state.releasedates;
		let fanPopularity = this.state.popularitys;
		let movieIdToFetch = this.state.moviesId;
		if (!images) return <div>Please wait while images load....</div>;

		// #3. Finally, render the `<Carousel />` with the state's images.
		return (
			<Carousel
				// autoPlay
				infiniteLoop="true"
				dots="false"
				showIndicators={false}
				interval={10000}
				onChange={this.fetchMoviesData(movieIdToFetch)}
			>
				{images.map((image, name) => {
					let formattedDate = Moment(datereleased[name]).format('MMM D YYYY');
					return (
						<div key={movieIdToFetch[name]}>
							<img src={image} alt="Johnny Covers" />
							<h1>{originaltitle[name]}</h1>
							<h3>Status: {this.state.status}</h3>
							<p>{moviesoverview[name]}</p>
							<p>Release Date: {formattedDate}</p> <p>Fan Popularity: {fanPopularity[name]}%</p>
							<p>Movies Revenue: {this.state.revenue} Million $</p>
							<p>Movies Runtime: {this.state.runtime} mins</p>
							<a href={this.state.homepage}>Movie Homepage</a>
						</div>
					);
				})}
			</Carousel>
		);
	}
}
export default CarouselComponent;
