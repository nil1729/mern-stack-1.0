// Action Types
import {
	SIGN_UP,
	SIGN_IN,
	LOAD_USER,
	LOG_OUT,
	STOP_INITIAL_LOADER,
	USER_DEV_PROFILE_CREATE,
	AUTH_ERROR,
} from '../types';

// Initial Auth State
const initialState = {
	isAuthenticated: false,
	loading: true,
	user: null,
};

// Reducer
const authReducers = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_UP:
		case SIGN_IN:
			localStorage.setItem('ACCESS_TOKEN', action.payload.responses.accessToken);
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.responses.user,
			};
		case LOAD_USER: {
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload.user,
			};
		}
		case STOP_INITIAL_LOADER:
			return {
				...state,
				loading: false,
			};
		case AUTH_ERROR:
		case LOG_OUT:
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				loading: false,
				user: null,
			};
		case USER_DEV_PROFILE_CREATE:
			return {
				...state,
				user: {
					...state.user,
					new_account: false,
				},
			};
		default: {
			return state;
		}
	}
};

export default authReducers;
