// Action Types
import { FETCH_DEVELOPERS, DEVELOPERS_LOADER } from '../types';

// Initial Auth State
const initialState = {
	developers: null,
	singleDeveloper: null,
	loading: null,
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
		default:
			return state;
	}
};

export default developerReducers;
