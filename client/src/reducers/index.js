import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './users/authUser';
import { rolesReducer, roleReducer } from './roles/roles';
import {
  compsReducer,
  compTypesReducer,
  competencyReducer
} from './comps/comps';
import { coursesReducer, courseReducer } from './courses/courses';
import courseLevelsReducer from './courses/course-levels';
import courseTypesReducer from './courses/course-types';
import { allUsersReducer, userSearchResultReducer } from './users/users';
import { deptsReducer, deptReducer } from './dept/deptReducer';

const reducer = combineReducers({
  auth: authReducer,
  allusers: allUsersReducer,
  user: userSearchResultReducer,
  roles: rolesReducer,
  role: roleReducer,
  comps: compsReducer,
  comp: competencyReducer,
  compTypes: compTypesReducer,
  courses: coursesReducer,
  course: courseReducer,
  courseTypes: courseTypesReducer,
  courseLevels: courseLevelsReducer,
  depts: deptsReducer,
  dept: deptReducer,
  form: reduxForm
});

export default reducer;
