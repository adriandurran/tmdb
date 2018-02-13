import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import auth, * as fromAuth from './users/authUser';
import rolesReducer from './models/roles';
import compsReducer from './models/comps';
import coursesReducer from './models/courses';
import _ from 'lodash';

const reducer = combineReducers({
  auth,
  roles: rolesReducer,
  comps: compsReducer,
  courses: coursesReducer
});

// concacanate the username....can be added to with rank etc...
export const selectUserName = state => fromAuth.selectUserName(state.auth);

// match up the user roles
export const selectUserRoles = state => state.auth.user.roles;
export const selectRoles = state => state.roles;
export const selectUserRoleNames = createSelector(
  selectUserRoles,
  selectRoles,
  (userRoles, rolesList) =>
    _.filter(rolesList, x => _.includes(userRoles, x.roleId))
);

// match up the courses to the user
export const selectUserCourses = state => state.auth.user.courses;
export const selectCourses = state => state.courses;
export const selectUserCourseNames = createSelector(
  selectUserCourses,
  selectCourses,
  (userCourses, coursesList) => {
    const filteredList = _.filter(coursesList, x =>
      _.includes(_.map(userCourses, 'courseId'), x.courseId)
    );
    return _.map(filteredList, obj => {
      return _.assign(obj, _.find(userCourses, { courseId: obj.courseId }));
    });
  }
);

export default reducer;
