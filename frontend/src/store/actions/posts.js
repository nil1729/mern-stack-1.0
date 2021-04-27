// Action Types
import {
	POST_LOADING,
	FETCH_POSTS,
	ADD_POST,
	POST_REACTION,
	ADD_COMMENT,
	DELETE_POST,
	DELETE_COMMENT,
	ADD_ALERTS,
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

const addPost = (data) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/posts`, data);
		dispatch({
			type: ADD_POST,
			payload: res.data.newPost,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: { ...res.data, newPost: undefined },
		});
		return true;
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

export { fetchPosts, addPost };
