import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

function App() {
	const [apiUrl] = useState('https://gnews.io/api/v3/search?');
	const [apiKey] = useState('95e7679f627d5796aa24f6692def5df3');
	const [data, setData] = useState([]);
	const [query, setQuery] = useState('');
	const [url, setUrl] = useState(`https://gnews.io/api/v3/top-news?token=95e7679f627d5796aa24f6692def5df3`);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
    const fetchData = async () => {
			setIsLoading(true);
			const result = await axios(url);
			setData(result.data);
			setIsLoading(false);
    };
    fetchData();
	}, [url]);

	const searchHandler = () => {
		setUrl(`${apiUrl}q=${query}&token=${apiKey}`)
		console.log(data.articles);
	}

	let newsNodes = data.articles && data.articles.map((item) => {
		return (
			<li key={item.publishedAt}>
				<a href={item.url}>{item.title}</a>
			</li>
		);
	});

	return (
    <>
			<input type='text' value={query} onChange={event => setQuery(event.target.value)} />
			<button type="button" onClick={searchHandler}>Search</button>
			{isLoading ? (
        <div>Loading ...</div>
      ) : (
				<ul>
					{newsNodes}
				</ul>
			)}
    </>
  );
}

App.propTypes = {
  data: PropTypes.array
};

export default App;
