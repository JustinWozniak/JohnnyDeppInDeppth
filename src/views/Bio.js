import React from 'react';


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
    <div>
    <div>Biodsdsds</div>
    </div>
    )
};

export default Bio;