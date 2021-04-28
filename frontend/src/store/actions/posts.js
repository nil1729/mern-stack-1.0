// Action Types
import {
	FETCH_POSTS,
	ADD_POST,
	POST_REACTION,
	ADD_COMMENT,
	DELETE_POST,
	DELETE_COMMENT,
	ADD_ALERTS,
	GET_SINGLE_POST,
	SINGLE_POST_LOADER,
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

const deletePostFromAccount = (id) => async (dispatch) => {
	try {
		const res = await sendRequest.delete(`/posts/${id}`);
		dispatch({
			type: DELETE_POST,
			payload: id,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
		return true;
	} catch (e) {
		console.log(e);
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

const postReaction = (id, like) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/posts/${id}/reactions`, { reaction: like });
		dispatch({
			type: POST_REACTION,
			payload: { id, reaction: like ? 1 : 0 },
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

const getSinglePostWithComments = (id) => async (dispatch) => {
	try {
		dispatch({
			type: SINGLE_POST_LOADER,
			payload: true,
		});
		const res = await sendRequest.get(`/posts/${id}`);
		dispatch({
			type: GET_SINGLE_POST,
			payload: { loading: false, ...res.data.results },
		});
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
		dispatch({
			type: GET_SINGLE_POST,
			payload: { post: { id } },
		});
	}
};

const addComment = (id, data) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/posts/${id}/comments`, data);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data.newComment,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: { ...res.data, newComment: undefined },
		});
		return true;
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

const deleteCommentFromAccount = (postID, commentID) => async (dispatch) => {
	try {
		const res = await sendRequest.delete(`/posts/${postID}/comments/${commentID}`);
		dispatch({
			type: DELETE_COMMENT,
			payload: { postID, commentID },
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

export {
	fetchPosts,
	addPost,
	deletePostFromAccount,
	postReaction,
	getSinglePostWithComments,
	addComment,
	deleteCommentFromAccount,
};
