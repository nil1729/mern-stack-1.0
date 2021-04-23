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
import sendRequest from '../utils/axios-setup';

// Load user on Start
const loadUser = () => async (dispatch) => {
	try {
		const res = await sendRequest.get('/auth/user');
		dispatch({ type: LOAD_USER, payload: res.data });
	} catch (e) {
		dispatch({ type: STOP_INITIAL_LOADER });
		if (e.response && e.response.status === 403) {
			dispatch({
				type: AUTH_ERROR,
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
		dispatch({ type: SIGN_IN, payload: res.data });
	} catch (e) {
		dispatch({
			type: AUTH_ERROR,
			payload: e.response && e.response.data,
		});
	}
};

// logout user
const logOut = () => async (dispatch) => dispatch({ type: LOG_OUT });

export { signInUser, loadUser, logOut };
