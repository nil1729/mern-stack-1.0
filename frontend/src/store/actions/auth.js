import {
	SIGN_UP,
	SIGN_IN,
	LOAD_USER,
	LOG_OUT,
	STOP_INITIAL_LOADER,
	ADD_ALERTS,
	AUTH_ERROR,
	CLEAR_ALERTS,
	CLEAR_POST_STATE,
	CLEAR_USER_PROFILE,
} from '../types';
import sendRequest, { setAuthToken } from '../utils/axios-setup';

// Load user on Start
const loadUser = () => async (dispatch) => {
	try {
		let accessToken = localStorage.getItem('ACCESS_TOKEN');
		if (accessToken) setAuthToken(accessToken);
		else return dispatch({ type: STOP_INITIAL_LOADER });

		const res = await sendRequest.get('/auth/user');
		dispatch({ type: LOAD_USER, payload: res.data });
		dispatch({
			type: ADD_ALERTS,
			payload: res.data.user.new_account
				? {
						success: true,
						message: 'Kindly create your developer profile',
				  }
				: null,
		});
	} catch (e) {
		setAuthToken();
		dispatch({ type: AUTH_ERROR });
		dispatch({ type: STOP_INITIAL_LOADER });
		if (e.response && e.response.status === 403) {
			dispatch({
				type: ADD_ALERTS,
				payload: e.response && e.response.data,
			});
		}
	}
};

// Sign in a user (Email and Password)
const signInUser = ({ email, password }) => async (dispatch) => {
	try {
		const res = await sendRequest.post('/auth/login', {
			email,
			password,
		});
		setAuthToken(res.data.responses.accessToken);
		dispatch({ type: SIGN_IN, payload: res.data });
		dispatch({
			type: ADD_ALERTS,
			payload: res.data.responses.user.new_account
				? [
						{
							success: true,
							message: res.data.message,
						},
						{
							success: true,
							message: 'Kindly create your developer profile',
						},
				  ]
				: {
						success: true,
						message: res.data.message,
				  },
		});
		return true;
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

// Register a user (Email and Password)
const signUpUser = ({ name, email, password }) => async (dispatch) => {
	try {
		const res = await sendRequest.post('/auth/register', {
			name,
			email,
			password,
		});
		setAuthToken(res.data.responses.accessToken);
		dispatch({ type: SIGN_UP, payload: res.data });
		dispatch({
			type: ADD_ALERTS,
			payload: res.data.responses.user.new_account
				? [
						{
							success: true,
							message: res.data.message,
						},
						{
							success: true,
							message: 'Kindly create your developer profile',
						},
				  ]
				: {
						success: true,
						message: res.data.message,
				  },
		});
		return true;
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

// logout user
const logOut = () => async (dispatch) => {
	setAuthToken();
	dispatch({ type: CLEAR_ALERTS });
	dispatch({ type: LOG_OUT });
	dispatch({ type: CLEAR_USER_PROFILE });
	dispatch({ type: CLEAR_POST_STATE });
};

export { signInUser, loadUser, logOut, signUpUser };
