// Action Types
import {
	SIGN_UP,
	SIGN_IN,
	LOAD_USER,
	LOG_OUT,
	CLEAR_ALERTS,
	AUTH_ALERTS,
	AUTH_ERROR,
	STOP_INITIAL_LOADER,
} from '../types';

// Initial Auth State
const initialState = {
	isAuthenticated: false,
	alerts: null,
	loading: true,
	user: null,
};

// Reducer
const authReducers = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_ERROR:
			return {
				...state,
				alerts: action.payload,
			};
		case SIGN_IN:
			localStorage.setItem('ACCESS_TOKEN', action.payload.responses.accessToken);
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.responses.user,
				alerts: action.payload.responses.user.new_account
					? [
							{
								success: true,
								message: action.payload.message,
							},
							{
								success: true,
								message: 'Kindly create your developer profile',
							},
					  ]
					: {
							success: true,
							message: action.payload.message,
					  },
			};
		case LOAD_USER: {
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload.user,
				alerts: action.payload.user.new_account
					? {
							success: true,
							message: 'Kindly create your developer profile',
					  }
					: null,
			};
		}
		case STOP_INITIAL_LOADER:
			return {
				...state,
				loading: false,
			};
		case LOG_OUT:
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				alerts: null,
				loading: false,
				user: null,
			};
		default: {
			return state;
		}
	}
};

export default authReducers;
