// Action Types
import { ADD_ALERTS } from '../types';

// Initial Auth State
const initialState = null;

// Reducer
const alertReducers = (state = initialState, action) => {
	switch (action.type) {
		case ADD_ALERTS:
			return action.payload;
		default: {
			return state;
		}
	}
};

export default alertReducers;
