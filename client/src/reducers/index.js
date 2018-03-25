import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form';

import authReducer from './users/authUser';
import rolesReducer from './models/roles';
import compsReducer from './models/comps';
import coursesReducer from './models/courses';
import courseLevelsReducer from './models/course-levels';
import courseTypesReducer from './models/course-types';

const reducer = combineReducers({
  auth: authReducer,
  roles: rolesReducer,
  comps: compsReducer,
  courses: coursesReducer,
  courseTypes: courseTypesReducer,
  courseLevels: courseLevelsReducer,
  form: reduxForm,
});

export default reducer;
