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

export const selectUserName = state => fromAuth.selectUserName(state.auth);
export const selectUserRoles = state => state.auth.user.roles;
export const selectRoles = state => state.roles;
export const selectUserRoleNames = createSelector(
  selectUserRoles,
  selectRoles,
  (userRoles, rolesList) =>
    _.filter(rolesList, x => _.includes(userRoles, x.roleId))
);

export default reducer;
