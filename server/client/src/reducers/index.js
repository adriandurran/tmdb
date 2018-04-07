import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './users/authUser';
import { rolesReducer, roleBuilderComps } from './roles/roles';
import { compsReducer, compBuilderCourses } from './comps/comps';
import coursesReducer from './courses/courses';
import courseLevelsReducer from './courses/course-levels';
import courseTypesReducer from './courses/course-types';

const reducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
  roleComps: roleBuilderComps,
  comps: compsReducer,
  compCourses: compBuilderCourses,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  courseLevels: courseLevelsReducer,
  form: reduxForm
});

export default reducer;
