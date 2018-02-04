import { combineReducers } from 'redux';
import userReducer from './authUser';
import rolesReducer from './roles';
import coursesReducer from './courses';

export default combineReducers({
  user: userReducer,
  roles: rolesReducer,
  courses: coursesReducer
});
