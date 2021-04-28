// Action Types
import {
	FETCH_DEVELOPERS,
	DEVELOPERS_LOADER,
	DEVELOPER_PROFILE_LOADER,
	FETCH_DEVELOPER_PROFILE,
} from '../types';

// Initial Auth State
const initialState = {
	developers: null,
	singleDeveloper: null,
	loading: null,
	profileLoading: null,
};

// Reducer
const developerReducers = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DEVELOPERS:
			return {
				...state,
				developers: action.payload,
				loading: false,
			};
		case DEVELOPERS_LOADER:
			return {
				...state,
				loading: action.payload,
			};
		case FETCH_DEVELOPER_PROFILE:
			return {
				...state,
				singleDeveloper: action.payload,
				profileLoading: false,
			};
		case DEVELOPER_PROFILE_LOADER:
			return {
				...state,
				profileLoading: action.payload,
			};
		default:
			return state;
	}
};

export default developerReducers;
