import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
	const [apiUrl] = useState('https://gnews.io/api/v3/search?');
	const [apiKey] = useState('95e7679f627d5796aa24f6692def5df3');
	const [data, setData] = useState([]);
	const [query, setQuery] = useState('');
	const [url, setUrl] = useState(`https://gnews.io/api/v3/top-news?token=95e7679f627d5796aa24f6692def5df3`);

	useEffect(() => {
    const fetchData = async () => {
      const result = await axios(url);
      setData(result.data);
    };
    fetchData();
	}, [url]);

	const searchHandler = () => {
		setUrl(`${apiUrl}q=${query}&token=${apiKey}`)
		console.log(data);
	}

	return (
    <>
      <>
				<input type='text' onChange={event => setQuery(event.target.value)} />
				<button onClick={searchHandler}>Search</button>
			</>
    </>
  );
}

export default App;
