import { useState, useEffect, useReducer } from 'react';
import newsFetchReducer from '../reducers/newsFetchReducer'
import axios from 'axios';

const useNewsApi = () => {
	const [url, setUrl] = useState(
		`https://gnews.io/api/v3/top-news?token=95e7679f627d5796aa24f6692def5df3`,
	);

	const [state, dispatch] = useReducer(newsFetchReducer, {
    isLoading: false,
    isError: false,
    data: [],
  });

	useEffect(() => {
		let didCancel = false;
    const fetchData = async () => {
			dispatch({ type: 'FETCH_INIT'});

			try {
				const result = await axios(url);
				if (!didCancel) {
					dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
				}
			} catch (error) {
				if (!didCancel) {
					dispatch({ type: 'FETCH_FAILURE'})
				}
			}
		};

		fetchData();

		return () => {
      didCancel = true;
    };
	}, [url]);

	return [state, setUrl];
}

export default useNewsApi;