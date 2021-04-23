import { combineReducers } from 'redux';
import authReducers from './auth';

export default combineReducers({
	AUTH_STATE: authReducers,
});
