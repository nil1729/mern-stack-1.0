import {
	FETCH_DASHBOARD,
	USER_PROFILE_LOADING_START,
	GET_DEV_PROFILE,
	ADD_ALERTS,
	USER_DEV_PROFILE_CREATE,
	DEV_PROFILE_CHANGE,
	ADD_NEW_CREDITS,
	REMOVE_EDUCATION,
	REMOVE_EXPERIENCE,
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

const createDevProfile = (userID, data) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/user/${userID}/profile`, data);

		dispatch({
			type: DEV_PROFILE_CHANGE,
			payload: data,
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

const updateDevProfile = (userID, data) => async (dispatch) => {
	try {
		const res = await sendRequest.put(`/user/${userID}/profile`, data);

		dispatch({
			type: DEV_PROFILE_CHANGE,
			payload: data,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
	}
};

const addEducation = (userID, data) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/user/${userID}/profile/education`, data);

		dispatch({
			type: ADD_NEW_CREDITS,
			payload: data,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
		return true;
	} catch (e) {
		console.log(e);
	}
};

const addExperience = (userID, data) => async (dispatch) => {
	try {
		const res = await sendRequest.post(`/user/${userID}/profile/experience`, data);

		dispatch({
			type: ADD_NEW_CREDITS,
			payload: data,
		});
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
		return true;
	} catch (e) {
		console.log(e);
	}
};

const deleteCreditFromAccount = (userID, id, creditType) => async (dispatch) => {
	try {
		let res;
		if (creditType === 'edu') {
			res = await sendRequest.delete(`/user/${userID}/profile/education/${id}`);
			dispatch({
				type: REMOVE_EDUCATION,
				payload: id,
			});
		} else {
			res = await sendRequest.delete(`/user/${userID}/profile/experience/${id}`);
			dispatch({
				type: REMOVE_EXPERIENCE,
				payload: id,
			});
		}
		dispatch({
			type: ADD_ALERTS,
			payload: res.data,
		});
	} catch (e) {
		console.log(e);
	}
};

export {
	fetchDashboard,
	fetchDevProfile,
	createDevProfile,
	updateDevProfile,
	addEducation,
	addExperience,
	deleteCreditFromAccount,
};
