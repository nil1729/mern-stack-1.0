import {
	FETCH_DASHBOARD,
	USER_PROFILE_LOADING_START,
	CLEAR_USER_PROFILE,
	GET_DEV_PROFILE,
	ADD_ALERTS,
	USER_DEV_PROFILE_CREATE,
	DEV_PROFILE_CHANGE,
} from '../types';

import sendRequest from '../utils/axios-setup';

// Fetch Logged in user Dashboard
const fetchDashboard = (userID) => async (dispatch) => {
	try {
		dispatch({ type: USER_PROFILE_LOADING_START });
		const res = await sendRequest.get(`/user/${userID}/profile/dashboard`);
		dispatch({
			type: FETCH_DASHBOARD,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
	}
};

// Fetch Logged in user Dev Profile
const fetchDevProfile = (userID) => async (dispatch) => {
	try {
		dispatch({ type: USER_PROFILE_LOADING_START });
		const res = await sendRequest.get(`/user/${userID}/profile/dashboard/dev-profile`);
		dispatch({
			type: GET_DEV_PROFILE,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
	}
};

const createDevProfile = (userID, data, currentProfile) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/user/${userID}/profile`, data);

		dispatch({
			type: DEV_PROFILE_CHANGE,
			payload: currentProfile,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
		dispatch({
			type: USER_DEV_PROFILE_CREATE,
		});
	} catch (e) {
		console.log(e);
	}
};

const updateDevProfile = (userID, data, currentProfile) => async (dispatch) => {
	try {
		const res = await sendRequest.put(`/user/${userID}/profile`, data);

		dispatch({
			type: DEV_PROFILE_CHANGE,
			payload: currentProfile,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
	}
};

const clearUserProfile = () => async (dispatch) => dispatch({ type: CLEAR_USER_PROFILE });

export { fetchDashboard, clearUserProfile, fetchDevProfile, createDevProfile, updateDevProfile };
