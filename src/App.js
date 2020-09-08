import React, { useState } from 'react';
import useNewsApi from '../src/hooks/useNewsApi';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

function App() {
	const [apiUrl] = useState('https://gnews.io/api/v3/search?');
	const [apiKey] = useState('95e7679f627d5796aa24f6692def5df3');
	const [query, setQuery] = useState('');
	const [{ data, isLoading, isError }, doFetch] = useNewsApi(
		`${apiUrl}q=${query}&token=${apiKey}`,
		{},
	);

	let newsNodes = data.articles && data.articles.map((item) => {
		return (
			<li key={uuidv4()}>
				<a href={item.url}>{item.title}</a>
			</li>
		);
	});

	return (
    <>
			<form
				onSubmit={event => {
					doFetch(`${apiUrl}q=${query}&token=${apiKey}`);

					event.preventDefault();
					setQuery('')
        }}>
				<input
					type='text'
					value={query}
					onChange={event => setQuery(event.target.value)} />
				<button type="submit">Search</button>
			</form>

			{isError && <div>Something went wrong ...</div>}

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
