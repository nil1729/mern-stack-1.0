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

// Initial Auth State
const initialState = {
	posts: null,
	loading: null,
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
			return action.payload;
		case ADD_COMMENT:
			return initialState;
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((it) => it.id !== action.payload),
			};
		case DELETE_COMMENT:
			return initialState;
		default: {
			return state;
		}
	}
};

export default postReducers;
