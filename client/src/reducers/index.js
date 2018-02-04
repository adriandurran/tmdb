import { combineReducers } from 'redux';
import userReducer from './authUser';
import rolesReducer from './roles';
import compsReducer from './comps';
import coursesReducer from './courses';

export default combineReducers({
  user: userReducer,
  roles: rolesReducer,
  comps: compsReducer,
  courses: coursesReducer
});
