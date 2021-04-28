// Action Types
import {
	POST_LOADING,
	FETCH_POSTS,
	ADD_POST,
	POST_REACTION,
	ADD_COMMENT,
	DELETE_POST,
	DELETE_COMMENT,
	GET_SINGLE_POST,
	SINGLE_POST_LOADER,
} from '../types';

// Initial Auth State
const initialState = {
	posts: null,
	loading: null,
	singlePost: { postDetails: null, loading: null },
};

// Reducer
const postReducers = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_POSTS:
			return {
				...state,
				loading: false,
				posts: !state.posts ? action.payload : [...state.posts, ...action.payload],
			};
		case ADD_POST:
			return {
				...state,
				posts: [action.payload, ...state.posts],
			};
		case POST_REACTION:
			return {
				...state,
				posts: state.posts.map((it) => {
					if (it.id === action.payload.id)
						return {
							...it,
							reacting: undefined,
							reaction: action.payload.reaction === it.reaction ? null : action.payload.reaction,
						};
					return it;
				}),
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((it) => it.id !== action.payload),
			};
		case SINGLE_POST_LOADER:
			return {
				...state,
				singlePost: {
					...state.singlePost,
					loading: action.payload,
				},
			};
		case GET_SINGLE_POST:
			return {
				...state,
				singlePost: { postDetails: action.payload, loading: false },
			};
		case ADD_COMMENT:
			return {
				...state,
				singlePost: {
					...state.singlePost,
					postDetails: {
						...state.singlePost.postDetails,
						comments: [action.payload, ...state.singlePost.postDetails.comments],
					},
				},
			};
		case DELETE_COMMENT:
			return {
				...state,
				singlePost: {
					...state.singlePost,
					postDetails: {
						...state.singlePost.postDetails,
						comments: state.singlePost.postDetails.comments.filter(
							(it) => it.id !== action.payload
						),
					},
				},
			};
		default: {
			return state;
		}
	}
};

export default postReducers;
