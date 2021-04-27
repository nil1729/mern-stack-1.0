// Action Types
import {
	POST_LOADING,
	FETCH_POSTS,
	ADD_POST,
	POST_REACTION,
	ADD_COMMENT,
	DELETE_POST,
	DELETE_COMMENT,
} from '../types';

import sendRequest from '../utils/axios-setup';

const fetchPosts = () => async (dispatch) => {
	try {
		const res = await sendRequest.get(`/posts`);
		dispatch({
			type: FETCH_POSTS,
			payload: res.data.results,
		});
	} catch (e) {
		console.log(e);
	}
};

export { fetchPosts };
