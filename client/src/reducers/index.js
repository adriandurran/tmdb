import { combineReducers } from 'redux';
import userReducer from './authUser';

export default combineReducers({
  user: userReducer
});
