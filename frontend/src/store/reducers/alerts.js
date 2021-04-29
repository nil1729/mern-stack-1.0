// Action Types
import { ADD_ALERTS, CLEAR_ALERTS } from '../types';

// Initial Auth State
const initialState = null;

// Reducer
const alertReducers = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ALERTS:
			console.log(state, action.payload);
			return state
				? Array.isArray(state)
					? [action.payload, ...state]
					: [action.payload, state]
				: action.payload;
		case CLEAR_ALERTS:
			return initialState;
		default:
			return state;
	}
};

export default alertReducers;
