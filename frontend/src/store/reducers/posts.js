// Action Types
import {
	FETCH_POSTS,
	ADD_POST,
	POST_REACTION,
	ADD_COMMENT,
	DELETE_POST,
	DELETE_COMMENT,
	GET_SINGLE_POST,
	SINGLE_POST_LOADER,
	CLEAR_POST_STATE,
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
				posts: state.posts
					? state.posts.map((it) => {
							if (it.id === action.payload.id)
								return {
									...it,
									reacting: undefined,
									reaction:
										action.payload.reaction === it.reaction ? null : action.payload.reaction,
								};
							return it;
					  })
					: state.posts,
				singlePost: state.singlePost.postDetails
					? {
							...state.singlePost,
							postDetails: {
								...state.singlePost.postDetails,
								post:
									state.singlePost.postDetails.post.id === action.payload.id
										? {
												...state.singlePost.postDetails.post,
												reaction:
													action.payload.reaction === state.singlePost.postDetails.post.reaction
														? null
														: action.payload.reaction,
										  }
										: state.singlePost.postDetails.post,
							},
					  }
					: state.singlePost,
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
				posts: state.posts
					? state.posts.map((it) => {
							if (it.id === action.payload.post_id) return { ...it, comments: it.comments + 1 };
							return it;
					  })
					: state.posts,
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
				posts: state.posts
					? state.posts.map((it) => {
							if (it.id === action.payload.postID)
								return { ...it, comments: it.comments > 0 ? it.comments - 1 : 0 };
							return it;
					  })
					: state.posts,
				singlePost: {
					...state.singlePost,
					postDetails: {
						...state.singlePost.postDetails,
						comments: state.singlePost.postDetails.comments.filter(
							(it) => it.id !== action.payload.commentID
						),
					},
				},
			};
		case CLEAR_POST_STATE:
			return initialState;
		default: {
			return state;
		}
	}
};

export default postReducers;
