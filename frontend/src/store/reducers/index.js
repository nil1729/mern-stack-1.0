import { combineReducers } from 'redux';
import authReducers from './auth';
import userProfileReducers from './user_profile';
import alertReducers from './alerts.js';
import postReducers from './posts';

export default combineReducers({
	AUTH_STATE: authReducers,
	USER_PROFILE: userProfileReducers,
	ALERTS: alertReducers,
	POSTS: postReducers,
});
