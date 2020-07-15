import React from 'react';
import babydepp from '../../src/assets/images/johnnybaby.jpg';
import babydepp2 from '../../src/assets/images/johnnybaby2.jpg';
import babydepp3 from '../../src/assets/images/johnnybaby3.jpg';

import { useAsync } from 'react-async';

const johnnyBio = 'https://api.themoviedb.org/3/person/85?api_key=' + process.env.REACT_APP_API_KEY + '&language=en-US';

// Then we'll fetch user data from this API
const getJohnnysBioTask = async () =>
	await fetch(johnnyBio)
		.then((res) => (res.ok ? res : Promise.reject(res)))
		.then((res) => res.json())
		.then((res) => res.biography);

const Bio = (props) => {
	const { data, error, isLoading } = useAsync({ promiseFn: getJohnnysBioTask });

	if (isLoading) return 'Loading...';
	if (error) return `Something went wrong: ${error.message} Johnnys Bio`;
	if (data) {
		console.log(data);
		
	}

	return (
		<div className="row">
			<div className="col-1-of-2">
				<h3 className="heading-tertiary u-margin-bottom-small">Like Something out of a movie...</h3>
				<p className="paragraph">
					{data}
				</p>

			</div>
			<div className="col-1-of-2">
				<div className="composition">
					<img src={babydepp} alt="Pic 1" className="composition__photo composition__photo--p1" />
					<img src={babydepp2} alt="Pic 2" className="composition__photo composition__photo--p2" />
					<img src={babydepp3} alt="Pic 3" className="composition__photo composition__photo--p3" />
					
			</div>
		</div>
		</div>
    )
};

export default Bio;