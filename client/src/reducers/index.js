import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './users/authUser';
import { rolesReducer } from './roles/roles';
import { compsReducer, compTypesReducer } from './comps/comps';
import { coursesReducer, courseReducer } from './courses/courses';
import courseLevelsReducer from './courses/course-levels';
import courseTypesReducer from './courses/course-types';
import { allUsersReducer, userSearchResultReducer } from './users/users';

const reducer = combineReducers({
  auth: authReducer,
  allusers: allUsersReducer,
  user: userSearchResultReducer,
  roles: rolesReducer,
  comps: compsReducer,
  compTypes: compTypesReducer,
  courses: coursesReducer,
  course: courseReducer,
  courseTypes: courseTypesReducer,
  courseLevels: courseLevelsReducer,
  form: reduxForm
});

export default reducer;
