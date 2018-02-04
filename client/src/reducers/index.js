import { combineReducers } from 'redux';
import userReducer from './users/authUser';
import rolesReducer from './models/roles';
import compsReducer from './models/comps';
import coursesReducer from './models/courses';

export default combineReducers({
  user: userReducer,
  roles: rolesReducer,
  comps: compsReducer,
  courses: coursesReducer
});
