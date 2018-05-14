import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './users/authUser';
import { rolesReducer } from './roles/roles';
import { compsReducer } from './comps/comps';
import coursesReducer from './courses/courses';
import courseLevelsReducer from './courses/course-levels';
import courseTypesReducer from './courses/course-types';
import { allUsersReducer } from './users/users';

const reducer = combineReducers({
  auth: authReducer,
  allusers: allUsersReducer,
  roles: rolesReducer,
  comps: compsReducer,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  courseLevels: courseLevelsReducer,
  form: reduxForm
});

export default reducer;
