// Action Types
import {
	FETCH_DASHBOARD,
	USER_PROFILE_LOADING_START,
	CLEAR_USER_PROFILE,
	GET_DEV_PROFILE,
	DEV_PROFILE_CHANGE,
	ADD_NEW_CREDITS,
} from '../types';

// Initial Auth State
const initialState = {
	dashboard: null,
	profile: null,
	loading: null,
};

// Reducer
const userProfileReducers = (state = initialState, action) => {
	switch (action.type) {
		case FETCH_DASHBOARD:
			return {
				...state,
				loading: false,
				dashboard: {
					educations: action.payload.education_credits,
					experiences: action.payload.experience_credit,
				},
				new_education: null,
				new_experience: null,
			};
		case GET_DEV_PROFILE:
			return {
				...state,
				loading: false,
				profile: action.payload.profile,
			};
		case USER_PROFILE_LOADING_START:
			return {
				...state,
				loading: true,
			};
		case DEV_PROFILE_CHANGE:
			return {
				...state,
				profile: {
					...state.profile,
					...action.payload,
				},
			};
		case ADD_NEW_CREDITS:
			return {
				...state,
				new_education: true,
				new_experience: true,
			};
		case CLEAR_USER_PROFILE:
			return initialState;
		default: {
			return state;
		}
	}
};

export default userProfileReducers;
