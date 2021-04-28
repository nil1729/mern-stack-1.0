// Action Types
import {
	FETCH_DEVELOPERS,
	DEVELOPERS_LOADER,
	ADD_ALERTS,
	DEVELOPER_PROFILE_LOADER,
	FETCH_DEVELOPER_PROFILE,
} from '../types';

import sendRequest from '../utils/axios-setup';

const fetchDevelopers = () => async (dispatch) => {
	try {
		dispatch({ type: DEVELOPERS_LOADER, payload: true });
		const res = await sendRequest.get(`/developers?view=public&url=/developers`);
		dispatch({
			type: FETCH_DEVELOPERS,
			payload: res.data.results,
		});
	} catch (e) {
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

const fetchDeveloperProfile = (username) => async (dispatch) => {
	try {
		dispatch({ type: DEVELOPER_PROFILE_LOADER, payload: true });
		const res = await sendRequest.get(
			`/developers/${username}?view=public&url=/developers/${username}`
		);
		dispatch({
			type: FETCH_DEVELOPER_PROFILE,
			payload: res.data.results,
		});
	} catch (e) {
		dispatch({
			type: FETCH_DEVELOPER_PROFILE,
			payload: {},
		});
		dispatch({
			type: ADD_ALERTS,
			payload: e.response && e.response.data,
		});
	}
};

export { fetchDevelopers, fetchDeveloperProfile };
