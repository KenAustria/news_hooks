import { useState, useEffect } from 'react';
import axios from 'axios';

const useNewsApi = () => {
	const [data, setData] = useState([]);
	const [url, setUrl] = useState(
		`https://gnews.io/api/v3/top-news?token=95e7679f627d5796aa24f6692def5df3`,
	);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	useEffect(() => {
    const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				const result = await axios(url);
				setData(result.data);
			} catch (error) {
				setIsError(true);
			}

			setIsLoading(false);
    };
    fetchData();
	}, [url]);

	return [{ data, isLoading, isError}, setUrl];
}

export default useNewsApi;